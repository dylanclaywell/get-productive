import { createSignal, Match, Switch } from 'solid-js'

import TodoList from '../components/TodoList'
import Settings from '../components/Settings'
import AppPanel from '../components/AppPanel/AppPanel'

import styles from './main.module.css'

export type AppContext = 'todo' | 'settings'

export default function Main() {
  const [getAppContext, setAppContext] = createSignal<AppContext>('todo')

  return (
    <div className={styles.main}>
      <AppPanel setAppContext={setAppContext} />
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
