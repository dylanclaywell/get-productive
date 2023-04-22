import { JSXElement } from 'solid-js'

import { createIsVisibleSignal } from '../signals/createIsVisibleSignal'

function Line(props: {
  isVisible: boolean
  class: string
  animation: string
}): JSXElement {
  return (
    <div
      class={`h-4 bg-gray-300 rounded-sm ${props.class}`}
      classList={{
        [`opacity-30 ${props.animation}`]: props.isVisible,
        'opacity-0': !props.isVisible,
      }}
    ></div>
  )
}

export function Skeleton() {
  const [getIsVisible, setRef] = createIsVisibleSignal()

  return (
    <div ref={setRef} class="space-y-4">
      <div class="space-y-3">
        <Line
          class="w-full h-4 bg-gray-300 rounded-sm"
          isVisible={getIsVisible()}
          animation="animate-grow-left-1"
        />
        <Line
          class="w-11/12"
          isVisible={getIsVisible()}
          animation="animate-grow-left-2"
        ></Line>
        <Line
          class="w-1/2"
          isVisible={getIsVisible()}
          animation="animate-grow-left-3"
        ></Line>
      </div>
      <div class="space-y-3">
        <Line
          class="w-1/4"
          isVisible={getIsVisible()}
          animation="animate-grow-left-4"
        ></Line>
        <Line
          class="w-full"
          isVisible={getIsVisible()}
          animation="animate-grow-left-5"
        ></Line>
        <Line
          class="w-2/3"
          isVisible={getIsVisible()}
          animation="animate-grow-left-6"
        ></Line>
      </div>
    </div>
  )
}
