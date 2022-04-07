import { createSignal, Match, Switch } from 'solid-js'
import classnames from 'classnames'

import MenuItem from '../components/MenuItem'
import TodoList from '../components/TodoList'
import Settings from '../components/Settings'
import { useTheme } from '@graphql/contexts/Theme'

import styles from './main.module.css'

type AppContext = 'todo' | 'settings'

export default function Main() {
  const [themeState] = useTheme()
  const [getAppContext, setAppContext] = createSignal<AppContext>('todo')

  return (
    <div className={styles.main}>
      <div
        className={classnames(styles['app-panel'], {
          [styles['app-panel-dark']]: themeState().theme === 'dark',
        })}
      >
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
