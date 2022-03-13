import classnames from 'classnames'
import { createEffect, createSignal, onCleanup, For } from 'solid-js'
import { v4 as generateId } from 'uuid'

import Fab from '../components/Fab/Fab'
import TextField from '../components/TextField'
import TodoCard from '../components/TodoCard'
import Switch from '../components/Switch'

import styles from './main.module.css'

interface TodoItem {
  id: string
  description: string
  isCompleted: boolean
  dateCompleted: Date | undefined
  dateCreated: Date
}

export default function Main() {
  const [getTodoItems, setTodoItems] = createSignal<TodoItem[]>([])
  const [getEnterMultiple, setUseMultipleEntries] = createSignal(false)
  const [getInputValue, setInputValue] = createSignal('')
  const [getIsFocused, setIsFocused] = createSignal(false)
  const [getInputIsOpen, setInputIsOpen] = createSignal(false)
  const [getInputIsExiting, setInputIsExiting] = createSignal(false)

  const getIncompleteItems = () =>
    getTodoItems().filter((item) => !item.isCompleted)
  const getCompletedItems = () =>
    getTodoItems().filter((item) => item.isCompleted)

  const addTodoItem = (description: string) => {
    setTodoItems([
      ...getTodoItems(),
      {
        id: generateId(),
        description,
        isCompleted: false,
        dateCreated: new Date(),
        dateCompleted: undefined,
      },
    ])
    setInputValue('')
  }

  const closeAddTodoItemPrompt = () => {
    setInputIsExiting(true)
  }

  const removeTodoItem = (id: string) => {
    setTodoItems(getTodoItems().filter((item) => item.id !== id))
  }

  const completeTodoItem = (id: string) => {
    const todoItems = () =>
      getTodoItems().map((item) => ({
        ...item,
        isCompleted: item.id === id ? !item.isCompleted : item.isCompleted,
        dateCompleted: new Date(),
      }))

    setTodoItems(todoItems())
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && getInputValue() !== '') {
      addTodoItem(getInputValue())

      if (!getEnterMultiple()) {
        closeAddTodoItemPrompt()
      }
    }
  }

  createEffect(() => {
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
          />
        )}
        <div className={styles['lists']}>
          <div className={styles['incomplete-list']}>
            <For each={getIncompleteItems()}>
              {(item) => (
                <TodoCard
                  id={item.id}
                  description={item.description}
                  isCompleted={item.isCompleted}
                  onDelete={removeTodoItem}
                  onComplete={completeTodoItem}
                />
              )}
            </For>
          </div>
          {getCompletedItems().length && (
            <div className={styles['complete-list']}>
              <h2 className={styles['complete-list-heading']}>Done</h2>
              <For each={getCompletedItems()}>
                {(item) => (
                  <TodoCard
                    id={item.id}
                    description={item.description}
                    isCompleted={item.isCompleted}
                    onDelete={removeTodoItem}
                    onComplete={completeTodoItem}
                  />
                )}
              </For>
            </div>
          )}
        </div>
        {getInputIsOpen() ? (
          <div
            className={'absolute right-8 bottom-8'}
            onAnimationEnd={() => {
              if (getInputIsExiting()) {
                setInputIsOpen(false)
                setInputIsExiting(false)
              }
            }}
          >
            {!getInputIsExiting() && (
              <div className={styles['switch-container']}>
                <Switch
                  isChecked={getEnterMultiple()}
                  onClick={() => setUseMultipleEntries(!getEnterMultiple())}
                  label="Enter multiple"
                  labelIsOnLeft
                />
              </div>
            )}
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
          <Fab onClick={() => setInputIsOpen(true)} icon="fa-solid fa-plus" />
        )}
      </div>
    </div>
  )
}
