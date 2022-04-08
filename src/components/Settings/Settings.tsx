import classnames from 'classnames'
import { createEffect, createSignal } from 'solid-js'

import { useTheme } from '../../contexts/Theme'
import Switch from '../Switch'
import { query } from '../../gql/client'
import getTagsQuery from '@graphql/gql/getTags.graphql?raw'
import { Tag } from '../../generated/graphql'

import styles from './Settings.module.css'

export default function Settings() {
  const [getTags, setTags] = createSignal<Tag[]>([])
  const [getThemeState, { setTheme }] = useTheme()

  createEffect(async () => {
    const response = await query<Tag[]>(getTagsQuery)
    setTags(response.data.tags)
  })

  return (
    <div className={styles['settings']}>
      <h1 className={styles['settings-heading']}>Settings</h1>
      <h2>Tags</h2>
      <div className={styles['settings-tag-table']}>
        {getTags().map((tag) => (
          <div
            className={classnames(styles['settings-tag-table-row'], {
              [styles['settings-tag-table-row-dark']]:
                getThemeState().theme === 'dark',
            })}
          >
            <div>
              <input
                className={styles['settings-tag-table-input']}
                value={tag.name}
              />
            </div>
            <div className={styles['settings-tag-color']}>
              <div
                className={styles['settings-tag-color-sample']}
                style={{ 'background-color': tag.color }}
              />
              <input
                className={styles['settings-tag-table-input']}
                value={tag.color}
              />
            </div>
          </div>
        ))}
        <div
          className={classnames(styles['settings-tag-table-add-row'], {
            [styles['settings-tag-table-add-row-dark']]:
              getThemeState().theme === 'dark',
          })}
        >
          Add row
          <i className="fa-solid fa-plus" />
        </div>
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
