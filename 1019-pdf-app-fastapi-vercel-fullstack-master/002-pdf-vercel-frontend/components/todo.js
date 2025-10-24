// # Create components/todo.js with the following code:

import { useState } from 'react'
import styles from '../styles/todo.module.css'

export default function Todo({ todo, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(todo.name)

  // Handle checkbox toggle
  function handleToggle() {
    onToggle(todo.id)
  }

  // Handle delete button click
  function handleDelete() {
    if (window.confirm(`Are you sure you want to delete "${todo.name}"?`)) {
      onDelete(todo.id)
    }
  }

  // Start editing mode
  function startEditing() {
    setIsEditing(true)
    setEditValue(todo.name)
  }

  // Cancel editing
  function cancelEditing() {
    setIsEditing(false)
    setEditValue(todo.name)
  }

  // Save edit
  function saveEdit() {
    const trimmed = editValue.trim()
    if (trimmed.length > 0) {
      onUpdate(todo.id, trimmed)
      setIsEditing(false)
    } else {
      cancelEditing()
    }
  }

  // Handle key press in edit mode
  function handleEditKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault()  // Prevent form submission
      saveEdit()
    } else if (event.key === 'Escape') {
      event.preventDefault()
      cancelEditing()
    } else if (event.ctrlKey && event.key === 's') {
      event.preventDefault()  // Prevent browser save dialog
      saveEdit()
    }
  }

  return (
    <li className={`${styles.todoItem} ${todo.completed ? styles.completed : ''}`}>
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        className={styles.checkbox}
      />

      {/* Todo text or edit input */}
      <div className={styles.todoContent}>
        {isEditing ? (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleEditKeyDown}
            onBlur={saveEdit}
            className={styles.editInput}
            autoFocus
          />
        ) : (
          <span
            className={styles.todoText}
            onClick={startEditing}
            title="Click to edit"
          >
            {todo.name}
          </span>
        )}
      </div>

      {/* Action buttons */}
      <div className={styles.todoActions}>
        {isEditing ? (
          <>
            <button
              onClick={saveEdit}
              className={`${styles.actionButton} ${styles.saveButton}`}
              title="Save changes"
            >
              ✓
            </button>
            <button
              onClick={cancelEditing}
              className={`${styles.actionButton} ${styles.cancelButton}`}
              title="Cancel editing"
            >
              ✕
            </button>
          </>
        ) : (
          <>
            <button
              onClick={startEditing}
              className={`${styles.actionButton} ${styles.editButton}`}
              title="Edit todo"
            >
              ✏️
            </button>
            <button
              onClick={handleDelete}
              className={`${styles.actionButton} ${styles.deleteButton}`}
              title="Delete todo"
            >
              🗑️
            </button>
          </>
        )}
      </div>
    </li>
  )
}