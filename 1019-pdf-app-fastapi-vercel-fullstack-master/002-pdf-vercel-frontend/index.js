import { useState } from 'react'
import Head from 'next/head'
import Layout from '../components/layout'
import Todo from '../components/todo'
import TodoFilters from '../components/todo-filters'
import styles from '../styles/input.module.css'

export default function Home() {
  const [inputValue, setInputValue] = useState('')
  const [todos, setTodos] = useState([])
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [currentFilter, setCurrentFilter] = useState('all')  // New filter state

  // Input handling functions (same as before)
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

  // Todo management functions
  function createTodo(todoText) {
    const newTodo = {
      id: Date.now(),
      name: todoText,
      completed: false
    }
    setTodos([...todos, newTodo])
    setInputValue('')
    setError('')
    setSuccess(`Added "${todoText}" ✨`)
    
    setTimeout(() => setSuccess(''), 3000)
  }

  function toggleTodo(todoId) {
    setTodos(todos.map(todo => 
      todo.id === todoId 
        ? { ...todo, completed: !todo.completed }
        : todo
    ))
  }

  function deleteTodo(todoId) {
    setTodos(todos.filter(todo => todo.id !== todoId))
    setSuccess('Todo deleted successfully 🗑️')
    setTimeout(() => setSuccess(''), 2000)
  }

  function updateTodo(todoId, newName) {
    setTodos(todos.map(todo => 
      todo.id === todoId 
        ? { ...todo, name: newName }
        : todo
    ))
    setSuccess('Todo updated successfully ✏️')
    setTimeout(() => setSuccess(''), 2000)
  }

  // NEW: Filter handling function
  function handleFilterChange(newFilter) {
    setCurrentFilter(newFilter)
    setSuccess(`Showing ${newFilter} todos 🔍`)
    setTimeout(() => setSuccess(''), 2000)
  }

  // NEW: Calculate filtered todos based on current filter
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
  const filteredTodos = getFilteredTodos()  // NEW: Get filtered todos

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
          {/* Input Section */}
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="What needs to be done?"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className={inputClass}
              maxLength={150}
            />
            
            <div className={styles.inputCounter}>
              {inputValue.length}/100 characters
            </div>
            
            {error && (
              <div className={styles.errorMessage}>
                ❌ {error}
              </div>
            )}
            
            {success && (
              <div className={styles.successMessage}>
                {success}
              </div>
            )}
          </div>

          {/* NEW: Filter Component */}
          {todos.length > 0 && (
            <TodoFilters
              currentFilter={currentFilter}
              onFilterChange={handleFilterChange}
              totalCount={todos.length}
              activeCount={activeCount}
              completedCount={completedCount}
            />
          )}
          
          {/* Todo List - now using filtered todos */}
          <div>
            {todos.length === 0 ? (
              <div className={styles.emptyState}>
                <p>📝 No todos yet!</p>
                <p>Type something above and press Enter to get started.</p>
              </div>
            ) : filteredTodos.length === 0 ? (
              <div className={styles.emptyState}>
                <p>🔍 No {currentFilter} todos!</p>
                <p>
                  {currentFilter === 'active' && 'All todos are completed! Great job! 🎉'}
                  {currentFilter === 'completed' && 'No completed todos yet. Check some off!'}
                </p>
              </div>
            ) : (
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
            )}
          </div>

          {/* Debug Info */}
          <div className={styles.debugInfo}>
            <p><strong>🔍 Debug Info:</strong></p>
            <p>Current input: "{inputValue}" ({inputValue.length} chars)</p>
            <p>Current filter: {currentFilter}</p>
            <p>Total todos: {todos.length}</p>
            <p>Showing: {filteredTodos.length} todos</p>
            <p>Active todos: {activeCount}</p>
            <p>Completed todos: {completedCount}</p>
          </div>
        </main>
      </Layout>
    </>
  )
}