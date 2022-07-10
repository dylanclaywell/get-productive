import classNames from 'classnames'
import AppCard from '../components/AppCard/AppCard'
import GetNotingIcon from '../components/GetNotingIcon'
import GetTaskingIcon from '../components/GetTaskingIcon'

import styles from './home.module.css'

export default function Home() {
  return (
    <main>
      <section class={styles['home__hero']}>
        <h1 class={styles['home__heading']}>It's time to get productive</h1>
        <h2 class={styles['home__subheading']}>
          Productivity tools by a dev, for devs (or at least for one dev)
        </h2>
      </section>
      <section class={styles['home__apps']}>
        <AppCard
          href="/downloads?app=get-tasking"
          classes={classNames(
            styles['home__get-tasking-app'],
            styles['home__app']
          )}
          icon={GetTaskingIcon}
          subtitle={
            <span>
              get{' '}
              <span class={styles['home__get-tasking-label']}>
                T A S K I N G
              </span>
            </span>
          }
        />
        <AppCard
          href="/downloads?app=get-noting"
          classes={classNames(
            styles['home__get-noting-app'],
            styles['home__app']
          )}
          icon={GetNotingIcon}
          subtitle={
            <span>
              get{' '}
              <span class={styles['home__get-noting-label']}>N O T I N G</span>
            </span>
          }
        />
      </section>
    </main>
  )
}
