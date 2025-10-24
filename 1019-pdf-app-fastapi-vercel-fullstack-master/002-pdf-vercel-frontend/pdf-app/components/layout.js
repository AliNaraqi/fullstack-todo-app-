import styles from '../styles/layout.module.css'

export default function Layout(props) {
  return (
    <div className={styles.layout}>
      <h1 className={styles.title}>Todo App</h1>
      <p className={styles.subtitle}>Enhanced Todo Application with Real-time Features</p>
      {props.children}
    </div>
  )
}