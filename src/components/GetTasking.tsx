import { createSignal, JSXElement } from 'solid-js'

import { AppFeature } from './AppFeature'
import { Emphasis } from './Emphasis'
import { Feature } from './Feature'
import { Skeleton } from './Skeleton'
import { Todo } from './Todo'
import { CallToAction } from './CallToAction'

export function GetTasking(): JSXElement {
  return (
    <>
      <AppFeature
        backgroundSrc="src/assets/cyan-circle.svg"
        color="cyan"
        title="tasking"
        iconSrc="src/assets/get-tasking-icon.svg"
        imageSrc="src/assets/get-tasking-laptop.svg"
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
        right={
          <div class="space-y-8 flex flex-col items-center justify-center w-full">
            <Todo
              title="Create shopping cart"
              tagTitle="In Progress"
              tagColor="teal"
            />
            <Todo
              title="Design payment form"
              tagTitle="Needs more info"
              tagColor="yellow"
            />
            <Todo
              title="Update project dependencies"
              tagTitle="Ready to deploy"
              tagColor="lime"
            />
          </div>
        }
      />
      <CallToAction
        color="cyan"
        title="tasking"
        sourceUrl="https://github.com/dylanclaywell/get-tasking"
      />
    </>
  )
}
