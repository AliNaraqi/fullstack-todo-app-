import { useState, useEffect, useCallback } from 'react'
import { debounce } from 'lodash'
import Head from 'next/head'
import Layout from '../components/layout'
import Todo from '../components/todo'
import TodoFilters from '../components/todo-filters'
import { todoAPI } from '../utils/api'
import styles from '../styles/input.module.css'

export default function Home() {
  // State management
  const [inputValue, setInputValue] = useState('')
  const [todos, setTodos] = useState([])
  const [currentFilter, setCurrentFilter] = useState('all')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [apiConnected, setApiConnected] = useState(null)

  // Load todos on component mount
  useEffect(() => {
    loadTodos()
    checkApiConnection()
  }, [])

  // API Functions
  async function checkApiConnection() {
    const result = await todoAPI.testConnection()
    setApiConnected(result.connected)
    if (!result.connected) {
      setError(`API Connection Failed: ${result.error}`)
    }
  }

  async function loadTodos() {
    setLoading(true)
    try {
      const todosData = await todoAPI.getTodos()
      setTodos(todosData)
      setApiConnected(true)
    } catch (err) {
      setError(`Failed to load todos: ${err.message}`)
      setApiConnected(false)
      // Fallback to localStorage if API fails
      const localTodos = localStorage.getItem('fallback-todos')
      if (localTodos) {
        setTodos(JSON.parse(localTodos))
      }
    } finally {
      setLoading(false)
    }
  }

  // Debounced update function
  const debouncedUpdateTodo = useCallback(
    debounce(async (todoId, name, completed) => {
      try {
        await todoAPI.updateTodo(todoId, name, completed)
        // Update was successful - the optimistic update is already done
      } catch (err) {
        setError(`Failed to update todo: ${err.message}`)
        // Reload todos to get the correct state from server
        loadTodos()
      }
    }, 500),
    []
  )

  // Input handling
  function handleInputChange(event) {
    const value = event.target.value
    setInputValue(value)
    if (error) setError('')
    if (success) setSuccess('')
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      const trimmedValue = inputValue.trim()
      
      if (trimmedValue.length === 0) {
        setError('Please enter a todo item')
        return
      }
      
      if (trimmedValue.length > 100) {
        setError('Todo must be less than 100 characters')
        return
      }
      
      const isDuplicate = todos.some(todo => 
        todo.name.toLowerCase() === trimmedValue.toLowerCase()
      )
      
      if (isDuplicate) {
        setError('This todo already exists')
        return
      }
      
      createTodo(trimmedValue)
    }
  }

  // Todo management
  async function createTodo(todoText) {
    setLoading(true)
    try {
      const newTodo = await todoAPI.createTodo(todoText)
      setTodos([...todos, newTodo])
      setInputValue('')
      setError('')
      setSuccess(`Added "${todoText}" ✨`)
      
      // Save to localStorage as backup
      localStorage.setItem('fallback-todos', JSON.stringify([...todos, newTodo]))
      
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(`Failed to create todo: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  function toggleTodo(todoId) {
    // Optimistic update
    const updatedTodos = todos.map(todo => 
      todo.id === todoId 
        ? { ...todo, completed: !todo.completed }
        : todo
    )
    setTodos(updatedTodos)
    
    // Find the updated todo and send to API
    const updatedTodo = updatedTodos.find(todo => todo.id === todoId)
    debouncedUpdateTodo(todoId, updatedTodo.name, updatedTodo.completed)
    
    localStorage.setItem('fallback-todos', JSON.stringify(updatedTodos))
  }

  async function deleteTodo(todoId) {
    setLoading(true)
    try {
      await todoAPI.deleteTodo(todoId)
      const updatedTodos = todos.filter(todo => todo.id !== todoId)
      setTodos(updatedTodos)
      setSuccess('Todo deleted successfully 🗑️')
      
      localStorage.setItem('fallback-todos', JSON.stringify(updatedTodos))
      
      setTimeout(() => setSuccess(''), 2000)
    } catch (err) {
      setError(`Failed to delete todo: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  function updateTodo(todoId, newName) {
    // Optimistic update
    const updatedTodos = todos.map(todo => 
      todo.id === todoId 
        ? { ...todo, name: newName }
        : todo
    )
    setTodos(updatedTodos)
    
    // Find the updated todo and send to API
    const updatedTodo = updatedTodos.find(todo => todo.id === todoId)
    debouncedUpdateTodo(todoId, updatedTodo.name, updatedTodo.completed)
    
    localStorage.setItem('fallback-todos', JSON.stringify(updatedTodos))
    setSuccess('Todo updated successfully ✏️')
    setTimeout(() => setSuccess(''), 2000)
  }

  function handleFilterChange(newFilter) {
    setCurrentFilter(newFilter)
  }

  // Filter todos based on current filter
  function getFilteredTodos() {
    switch (currentFilter) {
      case 'active':
        return todos.filter(todo => !todo.completed)
      case 'completed':
        return todos.filter(todo => todo.completed)
      case 'all':
      default:
        return todos
    }
  }

  // Calculate statistics
  const completedCount = todos.filter(todo => todo.completed).length
  const activeCount = todos.length - completedCount
  const filteredTodos = getFilteredTodos()

  const inputClass = error 
    ? `${styles.mainInput} ${styles.inputError}` 
    : styles.mainInput

  return (
    <>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="A simple todo application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <main>
          {/* API Connection Status */}
          {apiConnected === false && (
            <div className={styles.connectionStatus + ' ' + styles.connectionOffline}>
              ⚠️ Working offline - changes saved locally
            </div>
          )}
          {apiConnected === true && (
            <div className={styles.connectionStatus + ' ' + styles.connectionOnline}>
              ✅ Connected to server
            </div>
          )}

          {/* Input Section */}
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="What needs to be done?"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className={inputClass}
              disabled={loading}
            />
            
            {error && (
              <div className={styles.errorMessage}>
                {error}
              </div>
            )}
            
            {success && (
              <div className={styles.successMessage}>
                {success}
              </div>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className={styles.loadingMessage}>
              <div className={styles.loadingSpinner}></div>
              Loading...
            </div>
          )}
          
          {/* Todo List */}
          <div>
            {todos.length === 0 && !loading ? (
              <div className={styles.emptyState}>
                <p>No todos yet!</p>
                <p>Add one above to get started.</p>
              </div>
            ) : filteredTodos.length === 0 && todos.length > 0 ? (
              <div className={styles.emptyState}>
                <p>No {currentFilter} todos!</p>
                {currentFilter === 'active' && <p>All done! Great job! 🎉</p>}
                {currentFilter === 'completed' && <p>No completed todos yet.</p>}
              </div>
            ) : (
              <>
                <ul className={styles.todoList}>
                  {filteredTodos.map((todo) => (
                    <Todo
                      key={todo.id}
                      todo={todo}
                      onToggle={toggleTodo}
                      onDelete={deleteTodo}
                      onUpdate={updateTodo}
                    />
                  ))}
                </ul>
                
                {/* Filter Component */}
                {todos.length > 0 && (
                  <TodoFilters
                    currentFilter={currentFilter}
                    onFilterChange={handleFilterChange}
                    totalCount={todos.length}
                    activeCount={activeCount}
                    completedCount={completedCount}
                  />
                )}
              </>
            )}
          </div>
        </main>
      </Layout>
    </>
  )
}