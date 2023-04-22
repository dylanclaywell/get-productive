import { JSXElement } from 'solid-js'

import { createIsVisibleSignal } from '../signals/createIsVisibleSignal'
import { Todo } from './Todo'

export function TodoItems(): JSXElement {
  const [getIsVisible, setRef] = createIsVisibleSignal()

  return (
    <div
      ref={setRef}
      class="space-y-8 flex flex-col items-center justify-center w-full"
    >
      <Todo
        title="Create shopping cart"
        tagTitle="In Progress"
        tagColor="teal"
        isVisible={getIsVisible()}
        animation="animate-slide-in-right-1"
      />
      <Todo
        title="Design payment form"
        tagTitle="Needs more info"
        tagColor="yellow"
        isVisible={getIsVisible()}
        animation="animate-slide-in-right-2"
      />
      <Todo
        title="Update project dependencies"
        tagTitle="Ready to deploy"
        tagColor="lime"
        isVisible={getIsVisible()}
        animation="animate-slide-in-right-3"
      />
    </div>
  )
}
