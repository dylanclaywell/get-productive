import { createSignal } from 'solid-js'
import classnames from 'classnames'

import { TodoItem } from '../../types/TodoItem'
import IconButton from '../IconButton'
import TextField from '../TextField'

import styles from './TodoEditPanel.module.css'

export interface Props {
  item: TodoItem
  updateTodoItem: (id: string, fieldName: keyof TodoItem, value: string) => void
  onClose: () => void
}

export default function TodoEditPanel(props: Props) {
  const [getIsClosing, setIsClosing] = createSignal(false)

  const handleCloseButtonClick = () => {
    setIsClosing(true)
  }

  const closePanel = () => {
    if (getIsClosing() === true) {
      props.onClose()
    }
  }

  return (
    <div
      className={classnames(styles['todo-edit-panel'], {
        [styles['todo-edit-panel-closing']]: getIsClosing(),
      })}
      onAnimationEnd={closePanel}
    >
      <div className={styles['close-button-container']}>
        <IconButton icon="fa-solid fa-xmark" onClick={handleCloseButtonClick} />
      </div>
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
    </div>
  )
}
