import {
  createSignal,
  createContext,
  useContext,
  JSX,
  Accessor,
  Show,
} from 'solid-js'
import StatusMessage from '../components/StatusMessage/StatusMessage'

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

const MessageContext = createContext<Context>([
  () => ({ currentMessage: undefined }),
  { setMessage: () => undefined },
])

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
      <Show when={getState().currentMessage}>
        <StatusMessage
          type={getState().currentMessage!.type}
          message={getState().currentMessage!.message}
          onClose={() => setState({ ...getState, currentMessage: undefined })}
        />
      </Show>
      {props.children}
    </MessageContext.Provider>
  )
}

export function useMessage() {
  return useContext(MessageContext)
}
