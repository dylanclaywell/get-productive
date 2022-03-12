import { JSX } from 'solid-js'

import styles from './Fab.module.css'

export interface Props {
  onClick: JSX.EventHandler<HTMLButtonElement, MouseEvent>
  icon: string
}

export default function Fab(props: Props) {
  return (
    <button className={styles['fab']} onClick={props.onClick}>
      <i className={props.icon}></i>
    </button>
  )
}
