import styles from './SkeletonTodoCard.module.css'

export default function SkeletonTodoCard() {
  return (
    <div className={styles['card']}>
      <div className={styles['checkmark']} />
      <div className={styles['title']} />
    </div>
  )
}
