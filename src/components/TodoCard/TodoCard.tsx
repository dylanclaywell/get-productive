import { createSignal, JSX } from 'solid-js'
import classnames from 'classnames'

import styles from './TodoCard.module.css'
import Menu from '../Menu'
import MenuItem from '../MenuItem'
import IconButton from '../IconButton'

export interface Props {
  id: string
  title: string
  isCompleted: boolean
  onDelete: (id: string) => void
  onComplete: (id: string) => void
  onClick: (id: string) => JSX.EventHandler<HTMLDivElement, MouseEvent>
}

export default function TodoCard(props: Props) {
  const [getMenuRef, setMenuRef] = createSignal<HTMLElement>()
  const [getMenuIsOpen, setMenuIsOpen] = createSignal(false)

  return (
    <div
      className={classnames(styles['todo-card'], {
        [styles['todo-card-done']]: props.isCompleted,
      })}
      onClick={props.onClick(props.id)}
    >
      <div className={styles['left-container']}>
        <div
          className={classnames(styles['checkbox'], {
            [styles['checkbox-done']]: props.isCompleted,
          })}
          onClick={(e) => {
            e.stopImmediatePropagation()
            props.onComplete(props.id)
          }}
        >
          {props.isCompleted && (
            <i
              className={classnames(
                'fa-solid',
                'fa-check',
                styles['checkmark']
              )}
            ></i>
          )}
        </div>
        <span
          className={classnames(styles['label'], {
            [styles['label-done']]: props.isCompleted,
          })}
        >
          {props.title}
        </span>
      </div>
      <IconButton
        ref={(el) => setMenuRef(el)}
        icon="fa-solid fa-ellipsis-vertical"
        onClick={(e) => {
          e.stopImmediatePropagation()
          setMenuIsOpen(true)
        }}
      />
      <Menu
        anchor={getMenuRef()}
        isOpen={getMenuIsOpen()}
        onClose={() => setMenuIsOpen(false)}
      >
        <MenuItem
          classes={styles['delete-button']}
          onClick={() => props.onDelete(props.id)}
        >
          Delete
        </MenuItem>
      </Menu>
    </div>
  )
}
