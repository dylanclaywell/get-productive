import {
  createSignal,
  createContext,
  useContext,
  JSX,
  Accessor,
} from 'solid-js'

export type MessageType = 'success' | 'error'

export interface State {
  currentMessage?: {
    message: string
    type: MessageType
  }
}

type Context = [
  Accessor<State>,
  {
    setMessage: ({
      message,
      type,
    }: {
      message: string
      type: MessageType
    }) => void
  }
]

const initialState: Accessor<State> = () => ({})

const MessageContext = createContext<Context>()

interface Props {
  children: JSX.Element
}

export default function MessageProvider(props: Props) {
  const [getState, setState] = createSignal<State>({})

  const store: Context = [
    getState,
    {
      setMessage: ({
        message,
        type,
      }: {
        message: string
        type: MessageType
      }) => {
        setState({ ...getState, currentMessage: { message, type } })
      },
    },
  ]

  return (
    <MessageContext.Provider value={store}>
      {getState().currentMessage?.message}
      {props.children}
    </MessageContext.Provider>
  )
}

export function useMessage() {
  return useContext(MessageContext)
}
