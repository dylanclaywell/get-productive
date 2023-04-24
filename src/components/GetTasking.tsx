import { JSXElement } from 'solid-js'

import { AppFeature } from './AppFeature'
import { Emphasis } from './Emphasis'
import { Feature } from './Feature'
import { Skeleton } from './Skeleton'
import { CallToAction } from './CallToAction'
import { TodoItems } from './TodoItems'

export function GetTasking(): JSXElement {
  return (
    <>
      <AppFeature
        backgroundSrc="src/assets/cyan-circle.svg"
        color="cyan"
        title="tasking"
        iconSrc="src/assets/get-tasking-icon.svg"
        imageSrc="src/assets/get-tasking-laptop.svg"
        id="get-tasking"
      >
        <p>
          get <Emphasis color="cyan">tasking</Emphasis> is a simple todo
          application with inspiration from Microsoft To Do.
        </p>
        <p>
          It was created with the goal of showing all todo items in a single
          list, and allows the user to complete tasks that will then stay on the
          date they were completed to make it easier to tell update stakeholders
          in meetings such as stand-ups on tasks that were completed on a
          certain day.
        </p>
      </AppFeature>
      <Feature
        class="bg-cyan text-white"
        left={<Skeleton />}
        right={
          <p class="text-heading-3 font-normal">
            Add details to your tasks to keep track of context
          </p>
        }
      />
      <Feature
        left={
          <p class="text-heading-3 font-normal">
            Create and assign custom tags to easily organize your tasks from
            start to finish
          </p>
        }
        right={<TodoItems />}
        class="overflow-hidden"
      />
      <CallToAction
        color="cyan"
        title="tasking"
        sourceUrl="https://github.com/dylanclaywell/get-tasking"
      />
    </>
  )
}
