import { createSignal, Match, Switch } from 'solid-js'

import MenuItem from '../components/MenuItem'
import TodoList from '../components/TodoList'
import Settings from '../components/Settings'

import styles from './main.module.css'

type AppContext = 'todo' | 'settings'

export default function Main() {
  const [getAppContext, setAppContext] = createSignal<AppContext>('todo')

  return (
    <div className={styles.main}>
      <div className={styles['app-panel']}>
        <MenuItem
          icon="fa-solid fa-check"
          isRounded={false}
          onClick={() => setAppContext('todo')}
        >
          Todo
        </MenuItem>
        <MenuItem
          icon="fa-solid fa-gear"
          isRounded={false}
          onClick={() => setAppContext('settings')}
        >
          Settings
        </MenuItem>
      </div>
      <Switch>
        <Match when={getAppContext() === 'todo'}>
          <TodoList />
        </Match>
        <Match when={getAppContext() === 'settings'}>
          <Settings />
        </Match>
      </Switch>
    </div>
  )
}
