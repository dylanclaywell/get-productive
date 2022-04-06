import { createEffect, createSignal, For } from 'solid-js'
import { format } from 'date-fns'

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

function padDateComponent(component: number) {
  return component < 10 ? `0${component}` : component
}

function getDateStringWithoutTime(date: Date) {
  return `${date.getFullYear()}-${padDateComponent(
    date.getMonth() + 1
  )}-${padDateComponent(date.getDate())}`
}

function getTimeStringWithoutDate(date: Date) {
  return `${padDateComponent(date.getHours())}:${padDateComponent(
    date.getMinutes()
  )}`
}

function getTimezoneStringWithoutDate(date: Date) {
  return format(date, 'XXX')
}

function getDateFromComponents({
  date,
  time,
  timezone,
}: {
  date: string
  time: string
  timezone: string
}) {
  return new Date(`${date}T${time}${timezone}`)
}

export default function TodoList() {
  const [getCurrentDate, setCurrentDate] = createSignal<Date>(new Date())
  const [getTodoItems, setTodoItems] = createSignal<TodoItem[]>([])
  const [getSelectedItemId, setSelectedItemId] = createSignal<string>()

  createEffect(() => {
    query<QueryTodoItemsArgs, Query['todoItems']>(getTodoItemsQuery, {
      input: {
        dateCompleted: {
          date: getDateStringWithoutTime(getCurrentDate()),
        },
        filters: {
          overrideIncompleteItems: true,
        },
      },
    }).then((data) => {
      setTodoItems(
        data.data.todoItems.map((item) => ({
          ...item,
          description: item.description ?? null,
          notes: item.notes ?? null,
          dateCompleted: item.dateCompleted
            ? getDateFromComponents({
                date: item.dateCompleted.date,
                time: item.dateCompleted.time,
                timezone: item.dateCompleted.timezone,
              })
            : null,
          dateCreated: getDateFromComponents({
            date: item.dateCreated.date,
            time: item.dateCreated.time,
            timezone: item.dateCreated.timezone,
          }),
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
        getDateStringWithoutTime(dateCompleted) ===
          getDateStringWithoutTime(getCurrentDate())
      )
    })

  const addTodoItem = async (title: string) => {
    const dateCreated = new Date()
    const createTodoItem = (
      await mutation<MutationCreateTodoItemArgs, Mutation['createTodoItem']>(
        createTodoItemMutation,
        {
          input: {
            title,
            dateCreated: {
              date: getDateStringWithoutTime(dateCreated),
              time: getTimeStringWithoutDate(dateCreated),
              timezone: getTimezoneStringWithoutDate(dateCreated),
            },
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
        dateCompleted: createTodoItem.dateCompleted
          ? getDateFromComponents({
              date: createTodoItem.dateCompleted.date,
              time: createTodoItem.dateCompleted.time,
              timezone: createTodoItem.dateCompleted.timezone,
            })
          : null,
        dateCreated: getDateFromComponents({
          date: createTodoItem.dateCreated.date,
          time: createTodoItem.dateCreated.time,
          timezone: createTodoItem.dateCreated.timezone,
        }),
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
    const dateCompleted = isCompleted ? null : getCurrentDate()

    const todoItems = () =>
      getTodoItems().map((item) => ({
        ...item,
        isCompleted: item.id === id ? !item.isCompleted : item.isCompleted,
        dateCompleted:
          item.id === id ? dateCompleted ?? null : item.dateCompleted,
      }))

    mutation<MutationUpdateTodoItemArgs, TodoItemGql>(updateTodoItemMutation, {
      input: {
        id,
        isCompleted: !isCompleted,
        dateCompleted: dateCompleted
          ? {
              date: getDateStringWithoutTime(dateCompleted),
              time: getTimeStringWithoutDate(dateCompleted),
              timezone: getTimezoneStringWithoutDate(dateCompleted),
            }
          : null,
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

      setTodoItems(todoItems())

      mutation<MutationUpdateTodoItemArgs, TodoItemGql>(
        updateTodoItemMutation,
        {
          input: {
            id,
            [fieldName]: value,
          },
        }
      )
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
            <h2 className={styles['list-heading']}>Todo</h2>
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
              <h2 className={styles['list-heading']}>Done</h2>
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
        <AddTodoItemWidget
          addTodoItem={addTodoItem}
          canOpen={!getSelectedItem()}
        />
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
