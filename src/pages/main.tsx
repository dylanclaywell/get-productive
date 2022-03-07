import classnames from 'classnames'
import { createEffect, createSignal, JSX, onCleanup } from 'solid-js'

import Fab from '../components/Fab/Fab'
import TextField from '../components/TextField'
import TodoCard from '../components/TodoCard'
import styles from './main.module.css'

export default function Main() {
  const [getTodoItems, setTodoItems] = createSignal<string[]>([])
  const [getInputValue, setInputValue] = createSignal('')
  const [getIsFocused, setIsFocused] = createSignal(false)
  const [getInputIsOpen, setInputIsOpen] = createSignal(false)
  const [getInputIsExiting, setInputIsExiting] = createSignal(false)

  const addTodoItem = (description: string) => {
    setTodoItems([...getTodoItems(), description])
    setInputIsExiting(true)
    setInputValue('')
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && getInputValue() !== '') {
      addTodoItem(getInputValue())
    }
  }

  createEffect(() => {
    console.log(getIsFocused())
    if (getInputIsOpen() && getIsFocused() && !getInputIsExiting()) {
      document.addEventListener('keydown', handleKeyDown)
    }
    onCleanup(() => document.removeEventListener('keydown', handleKeyDown))
  })

  return (
    <div className="flex h-screen">
      <div className="w-96">Categories</div>
      <div className={styles['todo-list']}>
        {getInputIsOpen() && (
          <div
            className={classnames(styles['overlay'], {
              [styles['overlay-leave']]: getInputIsExiting(),
            })}
            onClick={() => setInputIsExiting(true)}
          ></div>
        )}
        {getTodoItems().map((item) => (
          <TodoCard description={item} />
        ))}
        {getInputIsOpen() ? (
          <div
            className={classnames('absolute right-8 bottom-8')}
            onAnimationEnd={() => {
              console.log(getInputIsExiting())
              if (getInputIsExiting()) {
                setInputIsOpen(false)
                setInputIsExiting(false)
              }
            }}
          >
            <TextField
              fullWidth
              classes={{
                root: styles['text-field-container'],
                input: classnames(styles['text-field-input'], {
                  [styles['text-field-input-leave']]: getInputIsExiting(),
                }),
              }}
              label={getInputIsExiting() ? '' : 'Description'}
              value={getInputValue()}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => {
                setInputValue(e.currentTarget.value ?? '')
              }}
            />
          </div>
        ) : (
          <Fab
            onClick={() => setInputIsOpen(true)}
            icon={<i class="fa-solid fa-plus"></i>}
          />
        )}
      </div>
    </div>
  )
}
