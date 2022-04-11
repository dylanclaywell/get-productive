import { createSignal, JSX } from 'solid-js'
import classnames from 'classnames'

import styles from './TodoCard.module.css'
import Menu from '../Menu'
import MenuItem from '../MenuItem'
import IconButton from '../IconButton'
import { useTheme } from '@graphql/contexts/Theme'
import { Tag } from '../../generated/graphql'

export interface Props {
  id: string
  title: string
  isCompleted: boolean
  tags: Tag[]
  onDelete: (id: string) => void
  onComplete: (id: string, isCompleted: boolean) => void
  onClick: (id: string) => JSX.EventHandler<HTMLDivElement, MouseEvent>
  style?: string | JSX.CSSProperties | undefined
}

export default function TodoCard(props: Props) {
  const [getCanHover, setCanHover] = createSignal(false)
  const [getIsEntering, setIsEntering] = createSignal(true)
  const [getThemeState] = useTheme()
  const [getMenuRef, setMenuRef] = createSignal<HTMLElement>()
  const [getMenuIsOpen, setMenuIsOpen] = createSignal(false)

  return (
    <div
      style={props.style}
      className={classnames(styles['todo-card'], {
        [styles['todo-card-done']]: props.isCompleted,
        [styles['todo-card-dark']]: getThemeState().theme === 'dark',

        // Setting this class after loading so that hovering does not interfere with the animation
        [styles['hover']]: getCanHover(),
      })}
      onClick={props.onClick(props.id)}
      onAnimationEnd={() => {
        if (getIsEntering()) {
          setIsEntering(false)
          setCanHover(true)
        }
      }}
    >
      <div className={styles['left-container']}>
        <div
          className={classnames(styles['checkbox'], {
            [styles['checkbox-done']]: props.isCompleted,
          })}
          onClick={(e) => {
            e.stopImmediatePropagation()
            props.onComplete(props.id, props.isCompleted)
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
        <div className={styles['title-and-tags-container']}>
          <span
            className={classnames(styles['label'], {
              [styles['label-done']]: props.isCompleted,
            })}
          >
            {props.title}
          </span>
          {props.tags.map((tag) => (
            <span
              className={styles['todo-item-tag']}
              style={{ 'background-color': tag.color }}
            >
              {tag.name}
            </span>
          ))}
        </div>
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
