import {
  createSignal,
  createContext,
  useContext,
  JSX,
  Accessor,
} from 'solid-js'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

import Login from '../pages/login'
import { useMessage } from './Message'

export interface State {
  isAuthenticated: boolean
}

type Context = [
  Accessor<State>,
  {
    login: (email: string, password: string) => void
  }
]

const initialState: State = { isAuthenticated: false }

const UserContext = createContext<Context>()

interface Props {
  children: JSX.Element
}

export default function UserProvider(props: Props) {
  const [getMessageState, { setMessage }] = useMessage()
  const [getState, setState] = createSignal<State>(initialState)

  const login = async (email: string, password: string) => {
    // TODO log in logic goes here
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

      setMessage({ message: 'Success', type: 'success' })

      // setState({ ...getState(), isAuthenticated: true })
    } catch (e) {
      setMessage({ message: 'Auth failed', type: 'error' })
    }
  }
  const store: Context = [
    () => ({ isAuthenticated: false }),
    {
      login,
    },
  ]

  return (
    <UserContext.Provider value={store}>
      {getState().isAuthenticated ? (
        props.children
      ) : (
        <Login user={getState()} login={login} />
      )}
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
