import { JSX } from 'solid-js'
import classnames from 'classnames'

import styles from './MenuItem.module.css'

export interface Props {
  children: JSX.Element
  classes?: string
  onClick?: JSX.EventHandler<HTMLDivElement, MouseEvent>
  isRounded?: boolean
}

export default function MenuItem(props: Props) {
  return (
    <div
      onClick={props.onClick}
      className={classnames(props.classes, styles['menu-item'], {
        [styles['menu-item-rounded']]: props.isRounded ?? true,
      })}
    >
      {props.children}
    </div>
  )
}
