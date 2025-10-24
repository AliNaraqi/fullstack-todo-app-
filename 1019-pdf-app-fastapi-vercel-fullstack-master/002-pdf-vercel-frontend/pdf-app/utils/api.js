const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

// Generic API request function with better error handling
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
      let errorMessage = `HTTP error! status: ${response.status}`
      try {
        const errorData = await response.json()
        errorMessage = errorData.detail || errorMessage
      } catch {
        // If we can't parse the error as JSON, use the default message
      }
      throw new Error(errorMessage)
    }
    
    // Handle different response types
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      return await response.json()
    } else {
      return await response.text()
    }
  } catch (error) {
    console.error(`API Request Error for ${endpoint}:`, error)
    
    // Provide user-friendly error messages
    if (error.name === 'TypeError') {
      throw new Error('Network error - please check your connection')
    }
    throw error
  }
}

// Enhanced todo API functions
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
  async createTodo(name, completed = false) {
    const todoData = {
      name: name.trim(),
      completed: completed
    }
    return await apiRequest('/todos/', {
      method: 'POST',
      body: JSON.stringify(todoData),
    })
  },

  // Update a todo
  async updateTodo(todoId, name, completed) {
    const todoData = {
      name: name.trim(),
      completed: completed
    }
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
      const result = await apiRequest('/')
      return { connected: true, message: result }
    } catch (error) {
      return { connected: false, error: error.message }
    }
  }
}

export default todoAPI