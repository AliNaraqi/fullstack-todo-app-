# 🚀 Full-Stack Todo Application

A modern, production-ready todo application built with **FastAPI** (backend) and **Next.js/React** (frontend). Features real-time API integration, offline support, and a beautiful responsive UI.

![Todo App Demo](https://via.placeholder.com/800x400/4CAF50/FFFFFF?text=Todo+App+Demo)

## ✨ Features

### 🎯 Core Functionality
- ✅ **Create, Read, Update, Delete** todos
- 🔄 **Real-time synchronization** with backend API
- 📱 **Responsive design** - works on all devices
- 🔍 **Filter todos** (All, Active, Completed)
- ⌨️ **Keyboard shortcuts** and accessibility

### 🚀 Advanced Features
- 🌐 **Offline support** with localStorage fallback
- ⚡ **Optimistic updates** for instant UI feedback
- 🔄 **Debounced API calls** for better performance
- 🛡️ **Error boundaries** for graceful error handling
- 📊 **Connection status** indicators
- 🎨 **Modern UI** with smooth animations

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLite** - Lightweight database
- **Alembic** - Database migrations
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server

### Frontend
- **Next.js 14** - React framework
- **React 18** - UI library with hooks
- **CSS Modules** - Scoped styling
- **Lodash** - Utility functions
- **Fetch API** - HTTP client

## 🚀 Quick Start

### Prerequisites
- **Python 3.11+**
- **Node.js 18+**
- **npm** or **yarn**

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd 1019-pdf-app-fastapi-vercel-fullstack-master/001-pdf-fastapi-backend
   ```

2. **Create virtual environment:**
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run database migrations:**
   ```bash
   alembic upgrade head
   ```

5. **Start the server:**
   ```bash
   uvicorn main:app --reload --host 127.0.0.1 --port 8000
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd 1019-pdf-app-fastapi-vercel-fullstack-master/002-pdf-vercel-frontend/pdf-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   - Frontend: http://localhost:3000
   - Backend API: http://127.0.0.1:8000
   - API Documentation: http://127.0.0.1:8000/docs

## 📁 Project Structure

```
CRUD4/
├── 1019-pdf-app-fastapi-vercel-fullstack-master/
│   ├── 001-pdf-fastapi-backend/          # FastAPI Backend
│   │   ├── main.py                       # FastAPI app
│   │   ├── models.py                     # Database models
│   │   ├── crud.py                       # Database operations
│   │   ├── database.py                   # Database connection
│   │   ├── routers/                      # API routes
│   │   ├── alembic/                      # Database migrations
│   │   └── requirements.txt              # Python dependencies
│   │
│   └── 002-pdf-vercel-frontend/pdf-app/  # Next.js Frontend
│       ├── pages/                        # Next.js pages
│       ├── components/                   # React components
│       ├── styles/                       # CSS modules
│       ├── utils/                        # Utility functions
│       └── package.json                  # Node dependencies
│
├── *.ipynb                               # Jupyter notebooks
└── README.md                             # This file
```

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health check |
| `GET` | `/todos/` | Get all todos |
| `POST` | `/todos/` | Create new todo |
| `PUT` | `/todos/{id}` | Update todo |
| `DELETE` | `/todos/{id}` | Delete todo |

## 🎨 UI Components

- **Layout** - Main app wrapper
- **Todo** - Individual todo item
- **TodoFilters** - Filter buttons
- **ErrorBoundary** - Error handling
- **Input** - Todo input field

## 🔄 Development Workflow

1. **Backend changes** - FastAPI auto-reloads on file changes
2. **Frontend changes** - Next.js hot-reloads on file changes
3. **Database changes** - Use Alembic for migrations
4. **API testing** - Use FastAPI's built-in docs at `/docs`

## 🚀 Deployment

### Backend (FastAPI)
- **Railway** - Easy Python deployment
- **Heroku** - Popular platform
- **DigitalOcean** - VPS deployment
- **AWS/GCP** - Cloud platforms

### Frontend (Next.js)
- **Vercel** - Recommended (made by Next.js creators)
- **Netlify** - Static site hosting
- **GitHub Pages** - Free hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **FastAPI** team for the amazing Python framework
- **Next.js** team for the React framework
- **React** team for the UI library
- **Tailwind CSS** for design inspiration

## 📞 Contact

Your Name - [@yourusername](https://twitter.com/yourusername) - your.email@example.com

Project Link: [https://github.com/yourusername/todo-app](https://github.com/yourusername/todo-app)

---

⭐ **Star this repository if you found it helpful!**
