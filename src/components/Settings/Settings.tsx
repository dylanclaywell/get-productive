import classnames from 'classnames'
import {
  createEffect,
  createResource,
  createSignal,
  Index,
  Match,
  Switch,
} from 'solid-js'
import cloneDeep from 'lodash.clonedeep'
import { debounce } from 'debounce'

import { useTheme } from '../../contexts/Theme'
import ToggleSwitch from '../Switch'
import { query, mutation } from '../../gql/client'
import getTagsQuery from '@graphql/gql/getTags.graphql?raw'
import updateTagMutation from '@graphql/gql/updateTag.graphql?raw'
import createTagMutation from '@graphql/gql/createTag.graphql?raw'
import deleteTagMutation from '@graphql/gql/deleteTag.graphql?raw'
import {
  MutationCreateTagArgs,
  MutationDeleteTagArgs,
  MutationUpdateTagArgs,
  QueryTagsArgs,
  Status,
  Tag,
} from '../../generated/graphql'
import { useUser } from '../../contexts/User'
import SkeletonSettings from '../SkeletonSettings'
import IconButton from '../IconButton'

import styles from './Settings.module.css'

interface Errors {
  name: string[]
  color: string[]
}

function generateRandomNumber() {
  return Math.floor(Math.random() * 15)
}

function generateRandomColor() {
  const numbers: string[] = []
  for (let i = 0; i < 6; i++) {
    numbers.push(generateRandomNumber().toString(16))
  }

  return `#${numbers.join('')}`
}

async function fetchData({ uid }: { uid: string | null }) {
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

export default function Settings() {
  const [user] = useUser()
  const [getIsLoading, setIsLoading] = createSignal(true)
  const [getErrors, setErrors] = createSignal<Errors>({
    name: [],
    color: [],
  })
  const [data] = createResource(() => ({ uid: user().uid }), fetchData)
  const [getTags, setTags] = createSignal<Tag[]>([])
  const [getThemeState, { setTheme }] = useTheme()

  createEffect(async () => {
    const tags = data()?.data.tags

    setIsLoading(false)

    if (tags) {
      setTags(tags)
    }
  })

  const addError = (name: keyof Errors, id: string) => {
    const errors = cloneDeep(getErrors())

    if (!errors[name].includes(id)) {
      errors[name].push(id)
      setErrors(errors)
    }
  }

  const removeError = (name: keyof Errors, id: string) => {
    const errors = cloneDeep(getErrors())
    errors[name] = errors[name].filter((errorId) => errorId !== id)
    setErrors(errors)
  }

  const hasError = (name: keyof Errors, id: string) => {
    return getErrors()[name].includes(id)
  }

  const onChangeInput = debounce(
    async (
      id: string,
      name: keyof Omit<Tag, '__typename' | 'id'>,
      value: string,
      validation?: RegExp
    ) => {
      const uid = user().uid

      if (validation && !validation.test(value)) {
        addError(name, id)
        return
      }

      removeError(name, id)

      const tags = cloneDeep(getTags())
      const tag = tags.find((tag) => tag.id === id)
      const tagIndex = tags.findIndex((tag) => tag.id === id)

      if (!tag) {
        console.error('Tag not found')
        return
      }

      if (!uid) {
        console.error('No user id')
        return
      }

      const response = await mutation<MutationUpdateTagArgs, Tag>(
        updateTagMutation,
        {
          id,
          uid,
          [name]: value,
        }
      )

      if ('errors' in response) {
        console.error('Error updating tag')
        return
      }

      tags.splice(tagIndex, 1, response.data.updateTag)

      setTags(tags)
    },
    500
  )

  const addTagRow = async () => {
    const uid = user().uid

    if (!uid) {
      console.error('No user id')
      return
    }

    const response = await mutation<MutationCreateTagArgs, Tag>(
      createTagMutation,
      {
        color: generateRandomColor(),
        name: 'New Tag',
        uid,
      }
    )

    if ('errors' in response) {
      console.error('Error adding tag')
      return
    }

    setTags([
      ...getTags(),
      {
        ...response.data.createTag,
      },
    ])
  }

  return (
    <div className={styles['settings']}>
      <h1 className={styles['settings-heading']}>Settings</h1>
      <Switch>
        <Match when={!data() || getIsLoading()}>
          <div className={styles['skeleton']}>
            <SkeletonSettings />
            <SkeletonSettings />
          </div>
        </Match>
        <Match when={data() || !getIsLoading()}>
          <h2>Tags</h2>
          <div className={styles['settings-tag-table']}>
            <Index each={getTags()}>
              {(tag) => (
                <div
                  className={classnames(styles['settings-tag-table-row'], {
                    [styles['settings-tag-table-row-dark']]:
                      getThemeState().theme === 'dark',
                  })}
                >
                  <div>
                    <input
                      className={classnames(
                        styles['settings-tag-table-input'],
                        {
                          [styles['settings-tag-table-input-error']]: hasError(
                            'name',
                            tag().id
                          ),
                        }
                      )}
                      onInput={(e) => {
                        onChangeInput(tag().id, 'name', e.currentTarget.value)
                      }}
                      value={tag().name}
                    />
                  </div>
                  <div className={styles['settings-tag-color']}>
                    <div
                      className={styles['settings-tag-color-sample']}
                      style={{ 'background-color': tag().color }}
                    />
                    <input
                      className={classnames(
                        styles['settings-tag-table-input'],
                        {
                          [styles['settings-tag-table-input-error']]: hasError(
                            'color',
                            tag().id
                          ),
                        }
                      )}
                      onInput={(e) => {
                        onChangeInput(
                          tag().id,
                          'color',
                          e.currentTarget.value,
                          /^#[A-Fa-f0-9]{6}$/
                        )
                      }}
                      value={tag().color}
                    />
                    <div className={styles['delete-icon']}>
                      <IconButton
                        onClick={async () => {
                          const uid = user().uid
                          if (!uid) {
                            console.log('Error deleting tag')
                            return
                          }

                          await mutation<MutationDeleteTagArgs, Status>(
                            deleteTagMutation,
                            {
                              id: tag().id,
                              uid,
                            }
                          )
                        }}
                        icon="fa-solid fa-trash-can"
                      />
                    </div>
                  </div>
                </div>
              )}
            </Index>
            <button
              className={classnames(styles['settings-tag-table-add-row'], {
                [styles['settings-tag-table-add-row-dark']]:
                  getThemeState().theme === 'dark',
              })}
              onClick={addTagRow}
            >
              Add tag
              <i className="fa-solid fa-plus" />
            </button>
          </div>
          <div className={styles['settings-theme-container']}>
            <span>Light Theme</span>
            <ToggleSwitch
              isChecked={getThemeState().theme === 'dark'}
              label="Dark Theme"
              onClick={() =>
                getThemeState().theme === 'light'
                  ? setTheme('dark')
                  : setTheme('light')
              }
            />
          </div>
        </Match>
      </Switch>
    </div>
  )
}
