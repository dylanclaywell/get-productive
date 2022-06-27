import {
  createSignal,
  createContext,
  useContext,
  JSX,
  Accessor,
  Switch,
  Match,
} from 'solid-js'
import { getAuth, signOut, signInWithEmailAndPassword } from 'firebase/auth'
import { setToken } from '../lib/token'

import Login from '../pages/login'
import { useMessage } from './Message'

export interface State {
  isAuthenticated: boolean
  needsAuthReverification: boolean
  uid: string | null
}

type Context = [
  Accessor<State>,
  {
    login: (email: string, password: string) => void
    logout: () => void
  }
]

const initialState: State = {
  isAuthenticated: false,
  needsAuthReverification: true,
  uid: null,
}

const UserContext = createContext<Context>([
  () => initialState,
  {
    login: () => undefined,
    logout: () => undefined,
  },
])

interface Props {
  children: JSX.Element
}

export default function UserProvider(props: Props) {
  const [, { setMessage }] = useMessage()
  const [getState, setState] = createSignal<State>(initialState)

  const setUserData = ({ uid }: { uid: string }) => {
    setState({ ...getState(), isAuthenticated: true, uid })
  }

  getAuth().onAuthStateChanged(async (user) => {
    let uid: string | undefined

    if (user) {
      uid = user.uid
      setToken(await user.getIdToken())
    }

    setState({
      ...getState(),
      uid: user?.uid ?? null,
      isAuthenticated: Boolean(uid),
      needsAuthReverification: false,
    })
  })

  const login = async (email: string, password: string) => {
    try {
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user

      if (!user) {
        setMessage({ message: 'Invalid username/password', type: 'error' })
        return
      }

      setToken(await user.getIdToken())

      setUserData({ uid: user.uid })
    } catch (e) {
      setMessage({ message: 'Failed to log in', type: 'error' })
    }
  }
  const logout = async () => {
    try {
      await signOut(getAuth())

      setToken(undefined)

      setState({ ...getState(), isAuthenticated: false, uid: null })
    } catch {
      setMessage({ message: 'Failed to log out', type: 'error' })
    }
  }
  const store: Context = [
    getState,
    {
      login,
      logout,
    },
  ]

  return (
    <UserContext.Provider value={store}>
      <Switch fallback={<Login />}>
        <Match when={getState().needsAuthReverification} />
        <Match when={getState().isAuthenticated}>{props.children}</Match>
      </Switch>
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
