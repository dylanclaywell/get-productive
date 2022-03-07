import { createSignal } from 'solid-js'
import classnames from 'classnames'

import styles from './TodoCard.module.css'

export interface Props {
  description: string
}

export default function TodoCard(props: Props) {
  const [getIsDone, setIsDone] = createSignal(false)

  return (
    <div
      className={classnames(styles['todo-card'], {
        [styles['todo-card-done']]: getIsDone(),
      })}
    >
      <div
        className={classnames(styles['todo-card-checkbox'], {
          [styles['todo-card-checkbox-done']]: getIsDone(),
        })}
        onClick={() => setIsDone(!getIsDone())}
      >
        {getIsDone() && (
          <i
            className={classnames('fa-solid', 'fa-check', styles['checkmark'])}
          ></i>
        )}
      </div>
      <span
        className={classnames(styles['todo-card-label'], {
          [styles['todo-card-label-done']]: getIsDone(),
        })}
      >
        {props.description}
      </span>
    </div>
  )
}
