import { JSX } from 'solid-js'
import classnames from 'classnames'

import styles from './Switch.module.css'

export interface Props {
  isChecked: boolean
  label: string
  labelIsOnLeft?: boolean
  onClick: JSX.EventHandler<HTMLInputElement, MouseEvent>
}

export default function Switch(props: Props) {
  return (
    <div
      className={classnames(styles['root'], {
        [styles['root-reverse']]: props.labelIsOnLeft,
      })}
    >
      <label className={styles['switch']}>
        <input
          className={styles['input']}
          type="checkbox"
          checked={props.isChecked}
          onClick={props.onClick}
        />
        <span
          className={classnames(styles['toggle'], {
            [styles['toggle-checked']]: props.isChecked,
          })}
        ></span>
      </label>
      <span>{props.label}</span>
    </div>
  )
}
