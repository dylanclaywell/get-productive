import { createEffect, createSignal, JSX, onCleanup } from 'solid-js'

export interface Props {
  children: JSX.Element
  onClose: () => void
}

export default function Menu(props: Props) {
  const [getRef, setRef] = createSignal<HTMLDivElement>()

  const handleClick = (e: MouseEvent) => {
    console.log('LOLOL', e.button, e.target, getRef())
    if (e.target !== getRef()) {
      props.onClose()
    }
  }

  createEffect(() => {
    document.addEventListener('click', handleClick)

    onCleanup(() => document.removeEventListener('click', handleClick))
  })

  return (
    <div className="absolute top-0 left-0" ref={(el) => setRef(el)}>
      {props.children}
    </div>
  )
}
