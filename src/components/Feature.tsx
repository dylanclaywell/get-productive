import type { JSXElement } from 'solid-js'

export interface Props {
  id?: string
  left: JSXElement
  right: JSXElement
  flip?: boolean
  class?: string
}

export function Feature(props: Props): JSXElement {
  return (
    <section
      id={props.id}
      class={`grid grid-cols-12 gap-4 py-24 ${props.class ?? ''}`}
    >
      <div
        class="flex flex-col justify-center space-y-4"
        classList={{
          'col-start-2 col-span-5': !props.flip,
          'col-start-8 col-span-4': props.flip,
        }}
      >
        {props.left}
      </div>
      <div
        class="w-full h-full flex items-center justify-center"
        classList={{
          'col-start-8 col-span-4': !props.flip,
          'col-start-2 col-span-5 -order-1': props.flip,
        }}
      >
        {props.right}
      </div>
    </section>
  )
}
