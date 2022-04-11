import {
  createSignal,
  createContext,
  useContext,
  JSX,
  Accessor,
  createResource,
  createEffect,
} from 'solid-js'

import { query } from '../gql/client'
import { Theme as ThemeGQL } from '../generated/graphql'
import getThemeQuery from '../gql/getTheme.graphql?raw'
import { useUser } from './User'

type Theme = 'light' | 'dark'

interface State {
  theme: Theme
}

type Context = [
  Accessor<State>,
  {
    setTheme: (theme: Theme) => void
  }
]

const initialState: Accessor<State> = () => ({ theme: 'light' })

const initialValues: Context = [initialState, { setTheme: () => undefined }]

const ThemeContext = createContext<Context>(initialValues)

interface Props {
  children: JSX.Element
}

async function fetchTheme({ uid }: { uid: string | null }) {
  if (!uid) {
    console.error('No uid')
    return
  }

  const response = await query<null, Theme>(getThemeQuery)

  if (!response || 'errors' in response) {
    console.error('Error getting tags')
    return
  }

  return response
}

export default function ThemeProvider(props: Props) {
  const [getState, setState] = createSignal<State>(initialState())
  const store: Context = [
    getState,
    {
      setTheme(theme: Theme) {
        document.documentElement.style.setProperty(
          '--default-background-color',
          `var(--${theme}-mode-background-color)`
        )
        document.documentElement.style.setProperty(
          '--default-text-color',
          `var(--${theme}-mode-text-color)`
        )

        setState({ ...getState(), theme })
      },
    },
  ]

  createEffect(async () => {
    const response = await query<null, ThemeGQL>(getThemeQuery)

    if (!response || 'errors' in response) {
      console.error('Error getting tags')
      return
    }

    const theme = response.data.theme.type as Theme

    document.documentElement.style.setProperty(
      '--default-background-color',
      `var(--${theme}-mode-background-color)`
    )
    document.documentElement.style.setProperty(
      '--default-text-color',
      `var(--${theme}-mode-text-color)`
    )

    setState({ ...getState(), theme })
  })

  return (
    <ThemeContext.Provider value={store}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
