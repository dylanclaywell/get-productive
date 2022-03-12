import { createSignal } from 'solid-js'
import classnames from 'classnames'

import styles from './TodoCard.module.css'
import Menu from '../Menu'
import MenuItem from '../MenuItem'
import IconButton from '../IconButton'

export interface Props {
  description: string
}

export default function TodoCard(props: Props) {
  const [getIsDone, setIsDone] = createSignal(false)
  const [getMenuRef, setMenuRef] = createSignal<HTMLElement>()
  const [getMenuIsOpen, setMenuIsOpen] = createSignal(false)

  return (
    <div
      className={classnames(styles['todo-card'], {
        [styles['todo-card-done']]: getIsDone(),
      })}
    >
      <div className={styles['left-container']}>
        <div
          className={classnames(styles['checkbox'], {
            [styles['checkbox-done']]: getIsDone(),
          })}
          onClick={() => setIsDone(!getIsDone())}
        >
          {getIsDone() && (
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
            [styles['label-done']]: getIsDone(),
          })}
        >
          {props.description}
        </span>
      </div>
      <IconButton
        ref={(el) => setMenuRef(el)}
        icon="fa-solid fa-ellipsis-vertical"
        onClick={(e) => {
          console.log('click')

          e.stopImmediatePropagation()
          setMenuIsOpen(true)
          console.log(getMenuIsOpen())
          console.log(getMenuRef())
        }}
      />
      <Menu
        anchor={getMenuRef()}
        isOpen={getMenuIsOpen()}
        onClose={() => setMenuIsOpen(false)}
      >
        <MenuItem>Hello</MenuItem>
      </Menu>
    </div>
  )
}
