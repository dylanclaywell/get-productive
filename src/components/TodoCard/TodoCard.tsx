import { createEffect, createSignal } from 'solid-js'
import classnames from 'classnames'

import styles from './TodoCard.module.css'
import { useRightClick } from '../../contexts/RightClick'

export interface Props {
  description: string
}

export default function TodoCard(props: Props) {
  const [getIsDone, setIsDone] = createSignal(false)
  const [getRef, setRef] = createSignal<HTMLDivElement>()
  const rightClickContext = useRightClick()
  const [rightClickState, { setMenu, clearEvent }] = rightClickContext ?? [, {}]

  createEffect(() => {
    if (
      rightClickState?.() &&
      rightClickState?.().menu === undefined &&
      getRef() !== undefined &&
      getRef() === rightClickState?.().event?.target
    ) {
      setMenu?.({ options: [{ name: 'Hello', onClick: () => undefined }] })
      clearEvent?.()
    }
  })

  return (
    <div
      ref={(el) => setRef(el)}
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
      {rightClickState?.().menu &&
        rightClickState().menu?.options.map((option) => (
          <div>{option.name}</div>
        ))}
    </div>
  )
}
