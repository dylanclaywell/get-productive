import classNames from 'classnames'
import AppCard from '../components/AppCard/AppCard'
import GetNotingIcon from '../components/GetNotingIcon'
import GetTaskingIcon from '../components/GetTaskingIcon'

import styles from './main.module.css'

export type AppContext = 'todo' | 'settings'

export default function Main() {
  return (
    <main class={styles['main']}>
      <header class={styles['main__header']}>
        <a class={styles['main__logo']} href="/">
          get <span class={styles['main__logo--color']}>PRODUCTIVE</span>
        </a>
        <nav class={styles['main__nav']}>
          <a href="" class={styles['main__nav-link']}>
            Home
          </a>
          <a href="" class={styles['main__nav-link']}>
            Downloads
          </a>
          <a href="" class={styles['main__nav-link']}>
            Release Notes
          </a>
          <a href="" class={styles['main__nav-link']}>
            About
          </a>
        </nav>
      </header>
      <section class={styles['main__hero']}>
        <h1 class={styles['main__heading']}>It's time to get productive</h1>
        <h2 class={styles['main__subheading']}>
          Productivity tools by a dev, for devs (or at least for one dev)
        </h2>
      </section>
      <section class={styles['main__apps']}>
        <AppCard
          classes={classNames(
            styles['main__get-tasking-app'],
            styles['main__app']
          )}
          icon={GetTaskingIcon}
          subtitle={
            <span>
              get{' '}
              <span class={styles['main__get-tasking-label']}>
                T A S K I N G
              </span>
            </span>
          }
        />
        <AppCard
          classes={classNames(
            styles['main__get-noting-app'],
            styles['main__app']
          )}
          icon={GetNotingIcon}
          subtitle={
            <span>
              get{' '}
              <span class={styles['main__get-noting-label']}>N O T I N G</span>
            </span>
          }
        />
      </section>
    </main>
  )
}
