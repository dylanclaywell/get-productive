import { createEffect, createSignal, onCleanup } from 'solid-js'
import { format } from 'date-fns'
import classnames from 'classnames'

import { TodoItem } from '../../types/TodoItem'
import IconButton from '../IconButton'
import TextField from '../TextField'

import styles from './TodoEditPanel.module.css'
import Select from '../Select'

export interface Props {
  item: TodoItem
  updateTodoItem: (id: string, fieldName: keyof TodoItem, value: string) => void
  onClose: () => void
}

const rootFontSize = parseInt(
  window
    .getComputedStyle(document.body)
    .getPropertyValue('font-size')
    .split('px')[0]
)

export default function TodoEditPanel(props: Props) {
  const [getIsClosing, setIsClosing] = createSignal(false)
  const [getIsResizing, setIsResizing] = createSignal(false)
  const [getMouseX, setMouseX] = createSignal<number>()

  const handleCloseButtonClick = () => {
    setIsClosing(true)
  }

  const closePanel = () => {
    if (getIsClosing() === true) {
      props.onClose()
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    setMouseX(e.clientX)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsClosing(true)
    }
  }

  createEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
  })

  createEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
  })

  onCleanup(() => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('keydown', handleKeyDown)
  })

  const getPanelLeftValue = () => {
    const viewportWidth = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    )
    const maxLeft = viewportWidth - 15 * rootFontSize
    const mouseX = getMouseX() ?? 0

    if (mouseX && mouseX >= maxLeft) {
      return `${maxLeft}px`
    }

    return `${mouseX}px`
  }

  return (
    <div
      className={classnames(styles['todo-edit-panel'], {
        [styles['todo-edit-panel-closing']]: getIsClosing(),
      })}
      style={{
        left: getIsResizing() ? getPanelLeftValue() : undefined,
      }}
      onAnimationEnd={closePanel}
    >
      <div
        className={styles['resizer']}
        onMouseDown={(e) => {
          e.preventDefault()
          setIsResizing(true)
        }}
        onMouseUp={() => setIsResizing(false)}
      />
      <div className={styles['close-button-container']}>
        <IconButton icon="fa-solid fa-xmark" onClick={handleCloseButtonClick} />
      </div>
      <div className={styles['inputs-container']}>
        <TextField
          value={props.item.title}
          onChange={(e) =>
            props.updateTodoItem(
              props.item.id,
              'title',
              e.currentTarget.value ?? ''
            )
          }
          fullWidth
          label="Title"
        />
        <TextField
          value={props.item.description ?? ''}
          onChange={(e) =>
            props.updateTodoItem(
              props.item.id,
              'description',
              e.currentTarget.value ?? ''
            )
          }
          fullWidth
          label="Description"
        />
        <TextField
          value={format(props.item.dateCreated, 'yyyy-MM-dd hh:mm a') ?? ''}
          fullWidth
          isDisabled
          label="Date Created"
        />
        <TextField
          value={
            props.item.dateCompleted
              ? format(props.item.dateCompleted, 'yyyy-MM-dd hh:mm a')
              : ''
          }
          fullWidth
          isDisabled
          label="Date Completed"
        />
        <TextField
          value={props.item.notes ?? ''}
          fullWidth
          label="Notes"
          onChange={(e) =>
            props.updateTodoItem(
              props.item.id,
              'notes',
              e.currentTarget.value ?? ''
            )
          }
          multiline
          classes={{ input: styles['notes'] }}
        />
        {/* <Select
          fullWidth
          label="Tags"
          options={props.tags.map(tag => ({
            value: tag.
          }))}
          onChange={() => {}}
          value={'asdf'}
        /> */}
      </div>
    </div>
  )
}
