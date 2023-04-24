import type { JSXElement } from 'solid-js'

export interface Props {
  id?: string
  left: JSXElement
  right: JSXElement
  flip?: boolean
  flipOnMobile?: boolean
  class?: string
}

export function Feature(props: Props): JSXElement {
  return (
    <section
      id={props.id}
      class={`grid grid-cols-6 px-4 lg:px-0 lg:grid-cols-12 gap-4 py-8 lg:py-24 ${
        props.class ?? ''
      }`}
    >
      <div
        class="flex flex-col justify-center space-y-4"
        classList={{
          'col-start-1 col-span-6 lg:col-start-2 lg:col-span-5 lg:col-start-2 lg:col-span-5':
            !props.flip || props.flipOnMobile === false,
          'col-start-1 col-span-6 lg:col-start-8 lg:col-span-4':
            props.flip &&
            (props.flipOnMobile === undefined || props.flipOnMobile === true),
        }}
      >
        {props.left}
      </div>
      <div
        class="w-full h-full flex items-center justify-center"
        classList={{
          'col-start-1 col-span-6 lg:col-start-8 lg:col-span-4':
            !props.flip || props.flipOnMobile === false,
          'col-start-1 col-span-6 lg:col-start-2 lg:col-span-5 -order-1':
            props.flip &&
            (props.flipOnMobile === undefined || props.flipOnMobile === true),
        }}
      >
        {props.right}
      </div>
    </section>
  )
}
