import { JSX } from 'solid-js'
import classnames from 'classnames'

import styles from './IconButton.module.css'
import { useTheme } from '@graphql/contexts/Theme'

export interface Props {
  icon: string
  ref?: (el: HTMLButtonElement) => void
  onClick: JSX.EventHandler<HTMLButtonElement, MouseEvent>
}

export default function IconButton(props: Props) {
  const [themeState] = useTheme()

  return (
    <button
      ref={props.ref}
      onClick={props.onClick}
      className={classnames(styles['button'], {
        [styles['button-dark']]: themeState()?.theme === 'dark',
      })}
    >
      <i className={props.icon}></i>
    </button>
  )
}
