import classnames from 'classnames'
import { createEffect, createSignal, onCleanup, For } from 'solid-js'

import Fab from '../Fab/Fab'
import TextField from '../TextField'
import TodoCard from '../TodoCard'
import Switch from '../Switch'
import styles from './TodoList.module.css'
import TodoEditPanel from '../TodoEditPanel'
import { TodoItem } from '../../types/TodoItem'
import getTodoItemsQuery from '@graphql/gql/getTodoItems.graphql?raw'
import createTodoItemMutation from '@graphql/gql/createTodoItem.graphql?raw'
import deleteTodoItemMutation from '@graphql/gql/deleteTodoItem.graphql?raw'
import updateTodoItemMutation from '@graphql/gql/updateTodoItem.graphql?raw'
import { query, mutation } from '../../gql/client'
import {
  Query,
  Mutation,
  MutationCreateTodoItemArgs,
  MutationDeleteTodoItemArgs,
  MutationUpdateTodoItemArgs,
  TodoItem as TodoItemGql,
} from '../../generated/graphql'
import { debounce } from 'debounce'

export default function TodoList() {
  const [getTodoItems, setTodoItems] = createSignal<TodoItem[]>([])
  const [getEnterMultiple, setUseMultipleEntries] = createSignal(false)
  const [getInputValue, setInputValue] = createSignal('')
  const [getIsFocused, setIsFocused] = createSignal(false)
  const [getInputIsOpen, setInputIsOpen] = createSignal(false)
  const [getInputIsExiting, setInputIsExiting] = createSignal(false)
  const [getSelectedItemId, setSelectedItemId] = createSignal<string>()

  query<undefined, Query['todoItems']>(getTodoItemsQuery).then((data) => {
    setTodoItems(
      data.data.todoItems.map((item) => ({
        ...item,
        description: item.description ?? null,
        notes: item.notes ?? null,
        dateCompleted: item.dateCompleted ?? null,
      }))
    )
  })

  const getSelectedItem = () =>
    getTodoItems().find((item) => item.id === getSelectedItemId())

  const getIncompleteItems = () =>
    getTodoItems().filter((item) => !item.isCompleted)
  const getCompletedItems = () =>
    getTodoItems().filter((item) => item.isCompleted)

  const addTodoItem = async (title: string) => {
    setInputValue('')
    const createTodoItem = (
      await mutation<MutationCreateTodoItemArgs, Mutation['createTodoItem']>(
        createTodoItemMutation,
        {
          input: {
            title,
          },
        }
      )
    ).data.createTodoItem

    if (!createTodoItem) {
      console.error('Error creating todo item')
      return
    }

    setTodoItems([
      ...getTodoItems(),
      {
        ...createTodoItem,
        description: createTodoItem.description ?? null,
        notes: createTodoItem.notes ?? null,
        dateCompleted: createTodoItem.dateCompleted ?? null,
      },
    ])
  }

  const closeAddTodoItemPrompt = () => {
    setInputIsExiting(true)
  }

  const deleteTodoItem = (id: string) => {
    setTodoItems(getTodoItems().filter((item) => item.id !== id))
    mutation<MutationDeleteTodoItemArgs, Mutation['deleteTodoItem']>(
      deleteTodoItemMutation,
      {
        id,
      }
    )
  }

  const completeTodoItem = (id: string, isCompleted: boolean) => {
    const dateCompleted = isCompleted ? null : new Date().toISOString()

    const todoItems = () =>
      getTodoItems().map((item) => ({
        ...item,
        isCompleted: item.id === id ? !item.isCompleted : item.isCompleted,
        dateCompleted,
      }))

    mutation<MutationUpdateTodoItemArgs, TodoItemGql>(updateTodoItemMutation, {
      input: {
        id,
        isCompleted: !isCompleted,
        dateCompleted,
      },
    })

    setTodoItems(todoItems())
  }

  const updateTodoItem = debounce(
    (id: string, fieldName: keyof TodoItem, value: string) => {
      const todoItems = () =>
        getTodoItems().map((item) => {
          if (item.id === id) {
            return {
              ...item,
              [fieldName]: value,
            }
          }

          return item
        })

      mutation<MutationUpdateTodoItemArgs, TodoItemGql>(
        updateTodoItemMutation,
        {
          input: {
            id,
            [fieldName]: value,
          },
        }
      )

      setTodoItems(todoItems())
    },
    300
  )

  const handleKeyDownWhenAddingItem = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && getInputValue() !== '') {
      addTodoItem(getInputValue())

      if (!getEnterMultiple()) {
        closeAddTodoItemPrompt()
      }
    }

    if (e.key === 'Escape') {
      closeAddTodoItemPrompt()
    }
  }

  createEffect(() => {
    if (getInputIsOpen() && !getInputIsExiting()) {
      document.addEventListener('keydown', handleKeyDownWhenAddingItem)
    }
  })

  onCleanup(() =>
    document.removeEventListener('keydown', handleKeyDownWhenAddingItem)
  )

  return (
    <>
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
                  title={item.title}
                  isCompleted={item.isCompleted}
                  onDelete={deleteTodoItem}
                  onComplete={completeTodoItem}
                  onClick={(id) => () => setSelectedItemId(id)}
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
                    title={item.title}
                    isCompleted={item.isCompleted}
                    onDelete={deleteTodoItem}
                    onComplete={completeTodoItem}
                    onClick={(id) => () => setSelectedItemId(id)}
                  />
                )}
              </For>
            </div>
          )}
        </div>
        {getInputIsOpen() ? (
          <div
            className={styles['add-item-container']}
            onAnimationEnd={() => {
              if (getInputIsExiting()) {
                setInputIsOpen(false)
                setInputIsExiting(false)
                setInputValue('')
              }
            }}
          >
            {!getInputIsExiting() && (
              <div className={styles['switch-container']}>
                <Switch
                  isChecked={getEnterMultiple()}
                  onClick={() => setUseMultipleEntries(!getEnterMultiple())}
                  label="Enter multiple"
                />
              </div>
            )}
            <TextField
              fullWidth
              classes={{
                root: classnames(styles['text-field-container'], {
                  [styles['text-field-container-leave']]: getInputIsExiting(),
                }),
                input: classnames(styles['text-field-input'], {
                  [styles['text-field-input-leave']]: getInputIsExiting(),
                }),
              }}
              label={getInputIsExiting() ? '' : 'Title'}
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
      {getSelectedItem() && (
        <TodoEditPanel
          item={getSelectedItem()!}
          updateTodoItem={updateTodoItem}
          onClose={() => setSelectedItemId(undefined)}
        />
      )}
    </>
  )
}
