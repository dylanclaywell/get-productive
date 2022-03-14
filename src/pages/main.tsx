import TodoList from '../components/TodoList'

import styles from './main.module.css'

export default function Main() {
  return (
    <div className={styles.main}>
      <div className={styles['app-panel']}>Categories</div>
      <div>asdf</div>
      <TodoList />
    </div>
  )
}
