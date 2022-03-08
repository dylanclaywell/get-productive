import {
  Accessor,
  createContext,
  createEffect,
  createSignal,
  JSX,
  onCleanup,
  useContext,
} from 'solid-js'

import Menu from '../components/Menu'
import MenuItem from '../components/MenuItem'

export interface Option {
  name: string
  onClick: () => void
}

export interface Menu {
  options: Option[]
}

export interface State {
  event: MouseEvent | undefined
  menu: Menu | undefined
}

export interface Actions {
  setMenu: (menu: Menu) => void
  clearMenu: () => void
  clearEvent: () => void
}

const RightClickContext = createContext<[Accessor<State>, Actions]>()

export interface Props {
  children: JSX.Element
}

export function RightClickProvider(props: Props) {
  const [getRightClickState, setRightClickState] = createSignal<State>({
    event: undefined,
    menu: undefined,
  })
  const store: [Accessor<State>, Actions] = [
    getRightClickState,
    {
      setMenu(menu: Menu) {
        setRightClickState((state) => ({ ...state, menu }))
      },
      clearEvent() {
        setRightClickState((state) => ({ ...state, event: undefined }))
      },
      clearMenu() {
        setRightClickState((state) => ({ ...state, menu: undefined }))
      },
    },
  ]

  const handleRightClick = (e: MouseEvent) => {
    e.preventDefault()

    if (!getRightClickState().event) {
      setRightClickState({ ...getRightClickState(), event: e })
    }
  }

  createEffect(() => {
    document.addEventListener('contextmenu', handleRightClick)

    onCleanup(() =>
      document.removeEventListener('contextmenu', handleRightClick)
    )
  })

  return (
    <RightClickContext.Provider value={store}>
      {props.children}
      {Boolean(getRightClickState().menu)}
      {getRightClickState().menu && (
        <Menu onClose={store[1].clearMenu}>
          {getRightClickState().menu?.options.map((option) => (
            <MenuItem>Something: {option.name}</MenuItem>
          ))}
        </Menu>
      )}
    </RightClickContext.Provider>
  )
}

export function useRightClick() {
  return useContext(RightClickContext)
}
