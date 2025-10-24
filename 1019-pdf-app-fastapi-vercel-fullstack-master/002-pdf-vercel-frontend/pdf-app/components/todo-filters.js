import styles from '../styles/todo-filters.module.css'

export default function TodoFilters({ 
  currentFilter, 
  onFilterChange, 
  totalCount, 
  activeCount, 
  completedCount 
}) {
  const filters = [
    { 
      key: 'all', 
      label: 'All', 
      count: totalCount 
    },
    { 
      key: 'active', 
      label: 'Active', 
      count: activeCount 
    },
    { 
      key: 'completed', 
      label: 'Completed', 
      count: completedCount 
    }
  ]

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterButtons}>
        {filters.map(filter => {
          const isActive = currentFilter === filter.key
          
          return (
            <button
              key={filter.key}
              onClick={() => onFilterChange(filter.key)}
              className={`${
                styles.filterButton
              } ${isActive ? styles.active : ''}`}
              title={`Show ${filter.label.toLowerCase()} todos (${filter.count})`}
            >
              <span className={styles.filterLabel}>{filter.label}</span>
              <span className={styles.filterCount}>({filter.count})</span>
            </button>
          )
        })}
      </div>
      
      {/* Filter Summary */}
      <div className={styles.filterSummary}>
        Showing <strong>
          {currentFilter === 'all' && `all ${totalCount} todos`}
          {currentFilter === 'active' && `${activeCount} active todos`}
          {currentFilter === 'completed' && `${completedCount} completed todos`}
        </strong>
      </div>
    </div>
  )
}

