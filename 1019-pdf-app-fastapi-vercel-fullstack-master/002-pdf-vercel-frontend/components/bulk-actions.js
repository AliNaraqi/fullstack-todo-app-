// # Create components/bulk-actions.js:

import styles from '../styles/bulk-actions.module.css'

export default function BulkActions({ 
  totalCount, 
  activeCount, 
  completedCount,
  onMarkAllComplete,
  onMarkAllActive,
  onDeleteCompleted,
  onDeleteAll
}) {
  if (totalCount === 0) {
    return null // Don't show bulk actions if no todos
  }

  const handleMarkAllComplete = () => {
    if (window.confirm(`Mark all ${activeCount} active todos as complete?`)) {
      onMarkAllComplete()
    }
  }

  const handleMarkAllActive = () => {
    if (window.confirm(`Mark all ${completedCount} completed todos as active?`)) {
      onMarkAllActive()
    }
  }

  const handleDeleteCompleted = () => {
    if (window.confirm(`Delete all ${completedCount} completed todos? This cannot be undone.`)) {
      onDeleteCompleted()
    }
  }

  const handleDeleteAll = () => {
    if (window.confirm(`Delete ALL ${totalCount} todos? This cannot be undone.`)) {
      onDeleteAll()
    }
  }

  return (
    <div className={styles.bulkActionsContainer}>
      <div className={styles.bulkActionsTitle}>
        <strong>Bulk Actions</strong>
        <span className={styles.bulkActionsHint}>
          Apply actions to multiple todos at once
        </span>
      </div>
      
      <div className={styles.bulkActionButtons}>
        {activeCount > 0 && (
          <button
            onClick={handleMarkAllComplete}
            className={`${styles.bulkButton} ${styles.completeButton}`}
            title={`Mark ${activeCount} active todos as complete`}
          >
            ✅ Complete All ({activeCount})
          </button>
        )}
        
        {completedCount > 0 && (
          <>
            <button
              onClick={handleMarkAllActive}
              className={`${styles.bulkButton} ${styles.activeButton}`}
              title={`Mark ${completedCount} completed todos as active`}
            >
              ⏳ Reactivate All ({completedCount})
            </button>
            
            <button
              onClick={handleDeleteCompleted}
              className={`${styles.bulkButton} ${styles.deleteButton}`}
              title={`Delete ${completedCount} completed todos`}
            >
              🗑️ Delete Completed ({completedCount})
            </button>
          </>
        )}
        
        <button
          onClick={handleDeleteAll}
          className={`${styles.bulkButton} ${styles.dangerButton}`}
          title={`Delete all ${totalCount} todos`}
        >
          ⚠️ Delete All ({totalCount})
        </button>
      </div>
    </div>
  )
}