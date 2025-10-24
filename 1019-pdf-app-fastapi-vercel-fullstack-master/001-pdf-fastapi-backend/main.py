from functools import lru_cache
from typing import Union

from fastapi import FastAPI, Depends
from fastapi.responses import PlainTextResponse
from starlette.exceptions import HTTPException as StarletteHTTPException
from fastapi.middleware.cors import CORSMiddleware

# routers: import todos and pdfs routers
from routers import todos, pdfs

import config

app = FastAPI()

# CORS configuration - MUST be added before routers
# More explicit CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=False,  # Set to False when using "*" origins
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
    expose_headers=["*"],  # Expose all headers
)


# Manual CORS middleware (backup solution)
@app.middleware("http")
async def add_cors_headers(request, call_next):
    response = await call_next(request)
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "*"
    response.headers["Access-Control-Expose-Headers"] = "*"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    return response

# router: include todos and pdfs routers
app.include_router(todos.router)
app.include_router(pdfs.router)


# global http exception handler, to handle errors
@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request, exc):
    print(f"{repr(exc)}")
    return PlainTextResponse(str(exc.detail), status_code=exc.status_code)

# to use the settings
@lru_cache()
def get_settings():
    return config.Settings()


@app.get("/")
def read_root():
    return "Hello Todo World - Your CRUD API is ready!"


@app.get("/cors-test")
def cors_test():
    """Test endpoint to verify CORS is working"""
    return {
        "message": "CORS is working!",
        "cors_headers": "Should be present in response",
        "timestamp": "2024-01-01T00:00:00Z"
    }


@app.options("/cors-test")
def cors_test_options():
    """Handle preflight OPTIONS request"""
    return {"message": "CORS preflight successful"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}