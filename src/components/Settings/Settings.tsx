import classnames from 'classnames'
import { createEffect, createSignal, Index } from 'solid-js'
import cloneDeep from 'lodash.clonedeep'

import { useTheme } from '../../contexts/Theme'
import Switch from '../Switch'
import { query, mutation } from '../../gql/client'
import getTagsQuery from '@graphql/gql/getTags.graphql?raw'
import updateTagMutation from '@graphql/gql/updateTag.graphql?raw'
import createTagMutation from '@graphql/gql/createTag.graphql?raw'
import {
  MutationCreateTagArgs,
  MutationUpdateTagArgs,
  Tag,
} from '../../generated/graphql'

import styles from './Settings.module.css'
import { debounce } from 'debounce'

interface Errors {
  name: string[]
  color: string[]
}

interface SettingsTag extends Tag {
  isNew: boolean
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

export default function Settings() {
  const [getErrors, setErrors] = createSignal<Errors>({
    name: [],
    color: [],
  })
  const [getTags, setTags] = createSignal<SettingsTag[]>([])
  const [getThemeState, { setTheme }] = useTheme()

  createEffect(async () => {
    const response = await query<void, Tag[]>(getTagsQuery)
    setTags(
      response.data.tags.map((tag) => ({
        ...tag,
        isNew: false,
      }))
    )
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
      if (validation && !validation.test(value)) {
        addError(name, id)
        return
      }

      removeError(name, id)

      const tags = cloneDeep(getTags())
      const tag = tags.find((tag) => tag.id === id)
      const tagIndex = tags.findIndex((tag) => tag.id === id)

      if (!tag) {
        return
      }

      const response = await mutation<MutationUpdateTagArgs, Tag>(
        updateTagMutation,
        {
          id,
          [name]: value,
        }
      )

      tags.splice(tagIndex, 1, { ...response.data.updateTag, isNew: false })

      setTags(tags)
    },
    300
  )

  const addTagRow = async () => {
    const response = await mutation<MutationCreateTagArgs, Tag>(
      createTagMutation,
      {
        color: generateRandomColor(),
        name: 'New Tag',
      }
    )

    setTags([
      ...getTags(),
      {
        ...response.data.createTag,
        isNew: true,
      },
    ])
  }

  return (
    <div className={styles['settings']}>
      <h1 className={styles['settings-heading']}>Settings</h1>
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
                  className={classnames(styles['settings-tag-table-input'], {
                    [styles['settings-tag-table-input-error']]: hasError(
                      'name',
                      tag().id
                    ),
                  })}
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
                  className={classnames(styles['settings-tag-table-input'], {
                    [styles['settings-tag-table-input-error']]: hasError(
                      'color',
                      tag().id
                    ),
                  })}
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
        <Switch
          isChecked={getThemeState().theme === 'dark'}
          label="Dark Theme"
          onClick={() =>
            getThemeState().theme === 'light'
              ? setTheme('dark')
              : setTheme('light')
          }
        />
      </div>
    </div>
  )
}
