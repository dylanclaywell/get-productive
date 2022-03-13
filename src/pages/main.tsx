import TodoList from '../components/TodoList'

import styles from './main.module.css'

export default function Main() {
  return (
    <div className={styles.main}>
      <div className="w-96">Categories</div>
      <TodoList />
    </div>
  )
}
