import { useTheme } from '@graphql/contexts/Theme'
import { JSX, Show } from 'solid-js'
import { Portal } from 'solid-js/web'

import styles from './Menu.module.css'

export interface Props {
  children: JSX.Element
  isOpen: boolean
  onClose: () => void
  anchor: HTMLElement | undefined
}

const width = 16
const rootFontSize = parseInt(
  window
    .getComputedStyle(document.body)
    .getPropertyValue('font-size')
    .split('px')[0]
)

export default function Menu(props: Props) {
  const [getTheme] = useTheme()
  const getXPosition = () => {
    const left = props.anchor?.getBoundingClientRect().left ?? 0
    const right = props.anchor?.getBoundingClientRect().right ?? 0
    const viewportWidth = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    )

    // Set right instead of left if the menu extends passed the width of the screen
    if (left + width * rootFontSize > viewportWidth) {
      return { right: `${viewportWidth - right}px` }
    }

    return { left: `${left}px` }
  }

  return (
    <Show when={props.isOpen}>
      <Portal>
        <div className={styles.overlay} onClick={() => props.onClose()} />
        <div
          className={styles.menu}
          classList={{ [styles.dark]: getTheme()?.theme === 'dark' }}
          style={{
            top: `${props.anchor?.getBoundingClientRect().bottom ?? 0}px`,
            ...getXPosition(),
            width: `${width}rem`,
          }}
        >
          {props.children}
        </div>
      </Portal>
    </Show>
  )
}
