import { JSXElement } from 'solid-js'

export interface Props {
  children: JSXElement
  color: 'magenta' | 'cyan'
}

export function Emphasis(props: Props) {
  return (
    <span
      class="uppercase tracking-[0.5rem] -mr-[0.5rem] whitespace-nowrap"
      classList={{
        'text-magenta': props.color === 'magenta',
        'text-cyan': props.color === 'cyan',
      }}
    >
      {props.children}
    </span>
  )
}
