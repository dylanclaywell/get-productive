import { JSX } from 'solid-js'

import styles from './IconButton.module.css'

export interface Props {
  icon: string
  ref: (el: HTMLButtonElement) => void
  onClick: JSX.EventHandler<HTMLButtonElement, MouseEvent>
}

export default function IconButton(props: Props) {
  return (
    <button
      ref={props.ref}
      onClick={props.onClick}
      className={styles['button']}
    >
      <i className={props.icon}></i>
    </button>
  )
}
