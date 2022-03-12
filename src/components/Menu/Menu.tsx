import { JSX, Show } from 'solid-js'
import { Portal } from 'solid-js/web'

export interface Props {
  children: JSX.Element
  isOpen: boolean
  onClose: () => void
  anchor: HTMLElement | undefined
}

const width = 16
const rootFontSize = parseInt(
  window
    .getComputedStyle(document.body)
    .getPropertyValue('font-size')
    .split('px')[0]
)

export default function Menu(props: Props) {
  const getXPosition = () => {
    const left = props.anchor?.getBoundingClientRect().left ?? 0
    const right = props.anchor?.getBoundingClientRect().right ?? 0
    const viewportWidth = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    )

    // Set right instead of left if the menu extends passed the width of the screen
    if (left + width * rootFontSize > viewportWidth) {
      return { right: `${viewportWidth - right}px` }
    }

    return { left: `${left}px` }
  }

  return (
    <Show when={props.isOpen}>
      <Portal>
        <div
          className="absolute top-0 left-0 w-screen h-screen"
          onClick={() => props.onClose()}
        />
        <div
          className="absolute bg-white shadow-md rounded-md"
          style={{
            top: `${props.anchor?.getBoundingClientRect().bottom ?? 0}px`,
            ...getXPosition(),
            width: `${width}rem`,
          }}
        >
          {props.children}
        </div>
      </Portal>
    </Show>
  )
}
