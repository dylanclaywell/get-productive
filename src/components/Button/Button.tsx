import { JSX } from 'solid-js'

import styles from './Button.module.css'

interface Props {
  label: string
  onClick: JSX.EventHandler<HTMLButtonElement, MouseEvent>
  fullWidth?: boolean
}

export default function Button(props: Props) {
  return (
    <button
      className={styles.button}
      classList={{ [styles['full-width']]: props.fullWidth }}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  )
}
