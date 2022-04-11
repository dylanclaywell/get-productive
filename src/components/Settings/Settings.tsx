import { createResource, Suspense } from 'solid-js'

import { useTheme } from '../../contexts/Theme'
import ToggleSwitch from '../Switch'
import { mutation, query } from '../../gql/client'
import { MutationSetThemeArgs, Tag } from '../../generated/graphql'
import { useUser } from '../../contexts/User'
import SkeletonSettings from '../SkeletonSettings'
import TagsTable from './TagsTable'
import getTagsQuery from '@graphql/gql/getTags.graphql?raw'
import setThemeMutation from '@graphql/gql/setTheme.graphql?raw'

import styles from './Settings.module.css'

async function fetchTags({ uid }: { uid: string | null }) {
  if (!uid) {
    console.error('No uid')
    return
  }

  const response = await query<null, Tag[]>(getTagsQuery)

  if (!response || 'errors' in response) {
    console.error('Error getting tags')
    return
  }

  return response
}

export default function Settings() {
  const [user] = useUser()
  const [data, { mutate }] = createResource(
    () => ({ uid: user().uid }),
    fetchTags
  )
  const [getThemeState, { setTheme }] = useTheme()

  return (
    <div className={styles['settings']}>
      <h1 className={styles['settings-heading']}>Settings</h1>
      <Suspense
        fallback={
          <div className={styles['skeleton']}>
            <SkeletonSettings />
            <SkeletonSettings />
          </div>
        }
      >
        <h2>Tags</h2>
        <TagsTable tags={data()?.data.tags} mutateTags={mutate} />
        <div className={styles['settings-theme-container']}>
          <span>Light Theme</span>
          <ToggleSwitch
            isChecked={getThemeState().theme === 'dark'}
            label="Dark Theme"
            onClick={async () => {
              const newTheme =
                getThemeState().theme === 'light' ? 'dark' : 'light'
              await mutation<MutationSetThemeArgs, boolean>(setThemeMutation, {
                theme: newTheme,
              })

              setTheme(newTheme)
            }}
          />
        </div>
      </Suspense>
    </div>
  )
}
