import {
  createSignal,
  createContext,
  useContext,
  JSX,
  Accessor,
} from 'solid-js'

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

  return (
    <ThemeContext.Provider value={store}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
