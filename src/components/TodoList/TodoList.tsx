import { createResource, createSignal, Index, Suspense } from 'solid-js'
import { format } from 'date-fns'
import { debounce } from 'debounce'

import TodoCard from '../TodoCard'
import TodoEditPanel from '../TodoEditPanel'
import getTodoItemsQuery from '@graphql/gql/getTodoItems.graphql?raw'
import createTodoItemMutation from '@graphql/gql/createTodoItem.graphql?raw'
import deleteTodoItemMutation from '@graphql/gql/deleteTodoItem.graphql?raw'
import updateTodoItemMutation from '@graphql/gql/updateTodoItem.graphql?raw'
import getTagsQuery from '@graphql/gql/getTags.graphql?raw'
import { query, mutation } from '../../gql/client'
import {
  Query,
  Mutation,
  MutationCreateTodoItemArgs,
  MutationDeleteTodoItemArgs,
  MutationUpdateTodoItemArgs,
  TodoItem as TodoItemGql,
  QueryTodoItemsArgs,
  QueryTagsArgs,
  Tag,
} from '../../generated/graphql'
import AddTodoItemWidget from '../AddTodoItemWidget'
import DateHeader from '../DateHeader'
import { useUser } from '../../contexts/User'
import SkeletonTodoCard from '../SkeletonTodoCard'
import { ValueOf } from '../../utils/ValueOf'

import styles from './TodoList.module.css'

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

async function fetchTodoItems({
  uid,
  currentDate,
}: {
  uid: string | null
  currentDate: Date
}) {
  if (!uid) {
    console.error('No uid')
    return
  }

  const response = await query<QueryTodoItemsArgs, Query['todoItems']>(
    getTodoItemsQuery,
    {
      input: {
        uid,
        dateCompleted: {
          date: getDateStringWithoutTime(currentDate),
        },
        filters: {
          overrideIncompleteItems: true,
        },
      },
    }
  )

  if (!response || 'errors' in response) {
    console.error('Error getting todo items')
    return
  }

  return response
}

async function fetchTags({ uid }: { uid: string | null }) {
  if (!uid) {
    console.error('No uid')
    return
  }

  const response = await query<QueryTagsArgs, Tag[]>(getTagsQuery, {
    uid,
  })

  if (!response || 'errors' in response) {
    console.error('Error getting tags')
    return
  }

  return response
}

export default function TodoList() {
  const [getUserState] = useUser()
  const [getCurrentDate, setCurrentDate] = createSignal<Date>(new Date())
  const getUid = () => getUserState().uid
  const [tagsData] = createResource(
    () => ({ uid: getUserState().uid }),
    fetchTags
  )
  const [todoItemsData, { mutate }] = createResource(
    () => ({ uid: getUid(), currentDate: getCurrentDate() }),
    fetchTodoItems
  )
  const [getSelectedItemId, setSelectedItemId] = createSignal<string>()

  const todoItems = () =>
    todoItemsData()?.data.todoItems.map((item) => ({
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

  const getSelectedItem = () =>
    todoItems()?.find((item) => item.id === getSelectedItemId())

  const getIncompleteItems = () =>
    todoItems()?.filter((item) => !item.isCompleted)
  const getCompletedItems = () =>
    todoItems()?.filter((item) => {
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
    const uid = getUid()

    if (!uid) {
      console.error('No uid')
      return
    }

    const dateCreated = new Date()
    const response = await mutation<
      MutationCreateTodoItemArgs,
      Mutation['createTodoItem']
    >(createTodoItemMutation, {
      input: {
        uid,
        title,
        dateCreated: {
          date: getDateStringWithoutTime(dateCreated),
          time: getTimeStringWithoutDate(dateCreated),
          timezone: getTimezoneStringWithoutDate(dateCreated),
        },
      },
    })

    if (!response || 'errors' in response) {
      console.error('Error creating todo item')
      return
    }

    const createTodoItem = response.data.createTodoItem

    mutate((prev) => ({
      data: {
        todoItems: [...(prev?.data.todoItems ?? []), createTodoItem],
      },
    }))
  }

  const deleteTodoItem = (id: string) => {
    const uid = getUid()

    if (!uid) {
      console.error('No uid')
      return
    }

    mutate((prev) => ({
      data: {
        todoItems: prev?.data.todoItems.filter((item) => item.id !== id) ?? [],
      },
    }))
    mutation<MutationDeleteTodoItemArgs, Mutation['deleteTodoItem']>(
      deleteTodoItemMutation,
      {
        id,
        uid,
      }
    )
  }

  const completeTodoItem = (id: string, isCompleted: boolean) => {
    const dateCompleted = isCompleted ? null : getCurrentDate()
    const uid = getUid()

    if (!uid) {
      console.error('No uid')
      return
    }

    mutation<MutationUpdateTodoItemArgs, TodoItemGql>(updateTodoItemMutation, {
      input: {
        uid,
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

    mutate((prev) => ({
      data: {
        todoItems: (prev?.data.todoItems ?? []).map((item) => ({
          ...item,
          isCompleted: item.id === id ? !item.isCompleted : item.isCompleted,
          dateCompleted: dateCompleted
            ? {
                date: getDateStringWithoutTime(dateCompleted),
                time: getTimeStringWithoutDate(dateCompleted),
                timezone: getTimezoneStringWithoutDate(dateCompleted),
              }
            : null,
        })),
      },
    }))
  }

  const updateTodoItem = debounce(
    (
      id: string,
      fieldName: keyof MutationUpdateTodoItemArgs['input'],
      value: ValueOf<MutationUpdateTodoItemArgs['input']>
    ) => {
      const uid = getUserState().uid

      if (!uid) {
        console.error('No uid')
        return
      }

      mutate((prev) => ({
        data: {
          todoItems: [
            ...(prev?.data.todoItems ?? []).map((item) => ({
              ...item,
              ...(item.id === id && {
                uid,
                id,
                [fieldName]: value,
              }),
            })),
          ],
        },
      }))

      mutation<MutationUpdateTodoItemArgs, TodoItemGql>(
        updateTodoItemMutation,
        {
          input: {
            uid,
            id,
            [fieldName]: value,
          },
        }
      )
    },
    500
  )

  return (
    <>
      <div className={styles['todo-list']}>
        <DateHeader
          currentDate={getCurrentDate()}
          setCurrentDate={(date) => {
            mutate(() => undefined)
            setCurrentDate(date)
          }}
        />
        <Suspense
          fallback={
            <div className={styles['lists']}>
              <div className={styles['incomplete-list']}>
                <h2 className={styles['list-heading']}>Todo</h2>
                <SkeletonTodoCard />
                <SkeletonTodoCard />
                <SkeletonTodoCard />
              </div>
              <div className={styles['complete-list']}>
                <h2 className={styles['list-heading']}>Done</h2>
                <SkeletonTodoCard />
                <SkeletonTodoCard />
                <SkeletonTodoCard />
              </div>
            </div>
          }
        >
          <div className={styles['lists']}>
            <div className={styles['incomplete-list']}>
              <h2 className={styles['list-heading']}>Todo</h2>
              <Index each={getIncompleteItems()}>
                {(item, index) => (
                  <TodoCard
                    style={{
                      'animation-duration': `${index * 20 + 300}ms`,
                    }}
                    id={item().id}
                    title={item().title}
                    isCompleted={item().isCompleted}
                    tags={item().tags}
                    onDelete={deleteTodoItem}
                    onComplete={completeTodoItem}
                    onClick={(id) => () => setSelectedItemId(id)}
                  />
                )}
              </Index>
            </div>
            {getCompletedItems()?.length && (
              <div className={styles['complete-list']}>
                <h2 className={styles['list-heading']}>Done</h2>
                <Index each={getCompletedItems()}>
                  {(item, index) => (
                    <TodoCard
                      style={{
                        'animation-duration': `${index * 10 + 300}ms`,
                      }}
                      id={item().id}
                      title={item().title}
                      isCompleted={item().isCompleted}
                      tags={item().tags}
                      onDelete={deleteTodoItem}
                      onComplete={completeTodoItem}
                      onClick={(id) => () => setSelectedItemId(id)}
                    />
                  )}
                </Index>
              </div>
            )}
          </div>
        </Suspense>
        <AddTodoItemWidget
          addTodoItem={addTodoItem}
          canOpen={!getSelectedItem()}
        />
      </div>
      {getSelectedItem() && (
        <TodoEditPanel
          tags={tagsData()?.data.tags ?? []}
          item={getSelectedItem()!}
          updateTodoItem={updateTodoItem}
          onClose={() => setSelectedItemId(undefined)}
        />
      )}
    </>
  )
}
