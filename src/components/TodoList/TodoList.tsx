import { createEffect, createSignal, For } from 'solid-js'
import { isEqual } from 'date-fns'

import TodoCard from '../TodoCard'
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
  QueryTodoItemsArgs,
} from '../../generated/graphql'
import { debounce } from 'debounce'
import AddTodoItemWidget from '../AddTodoItemWidget'
import DateHeader from '../DateHeader'

function getDateWithoutTime(date: Date) {
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth() + 1,
    date.getUTCDate()
  )
}

export default function TodoList() {
  const [getCurrentDate, setCurrentDate] = createSignal<Date>(new Date())
  const [getTodoItems, setTodoItems] = createSignal<TodoItem[]>([])
  const [getSelectedItemId, setSelectedItemId] = createSignal<string>()

  createEffect(() => {
    query<QueryTodoItemsArgs, Query['todoItems']>(getTodoItemsQuery, {
      input: {
        dateCompleted: getDateWithoutTime(new Date()).toISOString(),
      },
    }).then((data) => {
      setTodoItems(
        data.data.todoItems.map((item) => ({
          ...item,
          description: item.description ?? null,
          notes: item.notes ?? null,
          dateCompleted: item.dateCompleted ?? null,
        }))
      )
    })
  })

  const getSelectedItem = () =>
    getTodoItems().find((item) => item.id === getSelectedItemId())

  const getIncompleteItems = () =>
    getTodoItems().filter((item) => !item.isCompleted)
  const getCompletedItems = () =>
    getTodoItems().filter((item) => {
      const dateCompleted = item.dateCompleted
        ? new Date(item.dateCompleted)
        : undefined

      return (
        item.isCompleted &&
        dateCompleted &&
        isEqual(
          getDateWithoutTime(dateCompleted),
          getDateWithoutTime(getCurrentDate())
        )
      )
    })

  const addTodoItem = async (title: string) => {
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

  return (
    <>
      <div className={styles['todo-list']}>
        <DateHeader
          currentDate={getCurrentDate()}
          setCurrentDate={setCurrentDate}
        />
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
        <AddTodoItemWidget addTodoItem={addTodoItem} />
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
