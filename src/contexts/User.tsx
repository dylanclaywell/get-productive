import {
  createSignal,
  createContext,
  useContext,
  JSX,
  Accessor,
  createEffect,
  Switch,
  Match,
} from 'solid-js'
import { getAuth, signOut, signInWithEmailAndPassword } from 'firebase/auth'

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

const UserContext = createContext<Context>()

interface Props {
  children: JSX.Element
}

export default function UserProvider(props: Props) {
  const [, { setMessage }] = useMessage()
  const [getState, setState] = createSignal<State>(initialState)

  const setUserData = ({ uid }: { uid: string }) => {
    setState({ ...getState(), isAuthenticated: true, uid })
  }

  createEffect(() => {
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        setUserData({ uid: user.uid })
      }

      setState({ ...getState(), needsAuthReverification: false })
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
        setMessage({ message: 'Auth failed', type: 'error' })
        return
      }

      setUserData({ uid: user.uid })
    } catch (e) {
      setMessage({ message: 'Auth failed', type: 'error' })
    }
  }
  const logout = async () => {
    try {
      await signOut(getAuth())
      setMessage({ message: 'Successfully logged out', type: 'success' })

      setState({ ...getState(), isAuthenticated: false })
    } catch {
      setMessage({ message: 'Failed to log out', type: 'error' })
    }
  }
  const store: Context = [
    () => initialState,
    {
      login,
      logout,
    },
  ]

  return (
    <UserContext.Provider value={store}>
      <Switch fallback={<Login user={getState()} login={login} />}>
        <Match when={getState().needsAuthReverification}></Match>
        <Match when={getState().isAuthenticated}>{props.children}</Match>
      </Switch>
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}

export function useUserDispatch() {
  const [, dispatch] = useContext(UserContext)

  return dispatch
}
