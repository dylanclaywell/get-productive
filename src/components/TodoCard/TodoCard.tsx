import styles from './TodoCard.module.css'

export default function TodoCard() {
  return (
    <div className={styles['todo-card']}>
      <div className={styles['todo-card-checkbox']}></div>
      <span className={styles['todo-card-label']}>Create a todo app</span>
    </div>
  )
}
