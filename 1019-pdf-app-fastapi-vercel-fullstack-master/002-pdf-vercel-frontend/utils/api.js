const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

// Generic API request function
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  
  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  }
  
  try {
    const response = await fetch(url, config)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    // Handle different response types
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      return await response.json()
    } else {
      return await response.text()
    }
  } catch (error) {
    console.error('API Request Error:', error)
    throw error
  }
}

// Specific API functions for todos
export const todoAPI = {
  // Get all todos (with optional filter)
  async getTodos(completed = null) {
    let endpoint = '/todos'
    if (completed !== null) {
      endpoint += `?completed=${completed}`
    }
    return await apiRequest(endpoint)
  },

  // Create a new todo
  async createTodo(todoData) {
    return await apiRequest('/todos/', {
      method: 'POST',
      body: JSON.stringify(todoData),
    })
  },

  // Update a todo
  async updateTodo(todoId, todoData) {
    return await apiRequest(`/todos/${todoId}`, {
      method: 'PUT',
      body: JSON.stringify(todoData),
    })
  },

  // Delete a todo
  async deleteTodo(todoId) {
    return await apiRequest(`/todos/${todoId}`, {
      method: 'DELETE',
    })
  },

  // Test API connection
  async testConnection() {
    try {
      return await apiRequest('/')
    } catch (error) {
      return null
    }
  }
}

export default todoAPI

