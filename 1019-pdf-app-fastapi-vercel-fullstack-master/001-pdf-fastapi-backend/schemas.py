from pydantic import BaseModel
from typing import Optional

class PDFRequest(BaseModel):
    name: str
    selected: bool
    file: str

class PDFResponse(BaseModel):
    id: int
    name: str
    selected: bool
    file: str

    class Config:
        from_attributes = True

class TodoBase(BaseModel):
    name: str
    completed: bool = False

class TodoCreate(TodoBase):
    pass

class TodoUpdate(BaseModel):
    name: Optional[str] = None
    completed: Optional[bool] = None

class Todo(TodoBase):
    id: int

    class Config:
        from_attributes = True