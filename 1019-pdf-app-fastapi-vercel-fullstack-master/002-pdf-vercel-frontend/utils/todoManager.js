// Simulated delay for testing loading states
const simulateDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Local storage helpers
const STORAGE_KEY = 'todo-app-data'

export const todoManager = {
  // Load todos from localStorage (simulating API call)
  async loadTodos() {
    await simulateDelay(500) // Simulate network delay
    
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
    return []
  },

  // Save todos to localStorage (simulating API call)
  async saveTodos(todos) {
    await simulateDelay(200) // Simulate network delay
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    return todos
  },

  // Create a new todo
  async createTodo(todoText, currentTodos) {
    const newTodo = {
      id: Date.now(),
      name: todoText.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    }
    
    const updatedTodos = [...currentTodos, newTodo]
    await this.saveTodos(updatedTodos)
    return newTodo
  },

  // Update todo
  async updateTodo(todoId, updates, currentTodos) {
    const updatedTodos = currentTodos.map(todo => 
      todo.id === todoId ? { ...todo, ...updates } : todo
    )
    await this.saveTodos(updatedTodos)
    return updatedTodos.find(todo => todo.id === todoId)
  },

  // Delete todo
  async deleteTodo(todoId, currentTodos) {
    const updatedTodos = currentTodos.filter(todo => todo.id !== todoId)
    await this.saveTodos(updatedTodos)
    return todoId
  },

  // Test connection (simulated)
  async testConnection() {
    await simulateDelay(1000)
    return { status: 'connected', message: 'Local storage ready' }
  }
}

export default todoManager

