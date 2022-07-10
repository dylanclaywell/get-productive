import { Match, Switch } from 'solid-js'
import { Link, useLocation } from 'solid-app-router'
import classNames from 'classnames'
import Button from '../components/Button'

import styles from './downloads.module.css'

export default function Downloads() {
  const location = useLocation()

  console.log(location.pathname, location.query.app)

  return (
    <div class={styles['downloads']}>
      <div class={styles['tabs']}>
        <Button
          href="/downloads?app=get-noting"
          variant="pink"
          label="get N O T I N G"
          isActive={location.query.app === 'get-noting'}
        />
        <Button
          href="/downloads?app=get-tasking"
          variant="blue"
          label="get T A S K I N G"
          isActive={location.query.app === 'get-tasking'}
        />
      </div>
      <Switch>
        <Match when={location.query.app === 'get-noting'}>
          <div class={styles['app-hero']}>
            <p class={styles['app-hero__heading']}>
              Download{' '}
              <span
                class={classNames(styles['app-name'], styles['app-name--pink'])}
              >
                get N O T I N G
              </span>{' '}
              to get noting
            </p>
            <p class={styles['app-hero__subheading']}>
              get N O T I N G is a simple note-taking app that supports
              Markdown.
            </p>
            <Button
              href=""
              label="Download for Windows"
              variant="pink"
              isActive
            />
          </div>
        </Match>
        <Match when={location.query.app === 'get-tasking'}>
          <div class={styles['app-hero']}>
            <p class={styles['app-hero__heading']}>
              Download{' '}
              <span
                class={classNames(styles['app-name'], styles['app-name--blue'])}
              >
                get T A S K I N G
              </span>{' '}
              to get tasking
            </p>
            <p class={styles['app-hero__subheading']}>
              get T A S K I N G is a simple todo app.
            </p>
            <Button
              href=""
              label="Download for Windows"
              variant="blue"
              isActive
            />
          </div>
        </Match>
      </Switch>
      <div class={styles['tab-content']}></div>
    </div>
  )
}
