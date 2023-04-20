import type { JSXElement } from 'solid-js'

import { AppFeature } from './components/AppFeature'
import { Emphasis } from './components/Emphasis'
import { Feature } from './components/Feature'
import { TaskingSkeleton } from './components/TaskingSkeleton'
import { Todo } from './components/Todo'
import { CallToAction } from './components/CallToAction'

export function App(): JSXElement {
  return (
    <>
      <nav class="flex justify-between p-4 items-center">
        <h1 class="text-heading-2 whitespace-nowrap">
          get <Emphasis color="cyan">productive</Emphasis>
        </h1>
        <ul class="flex space-x-2">
          <li class="whitespace-nowrap">Home</li>
          <li class="whitespace-nowrap">
            get <Emphasis color="cyan">tasking</Emphasis>
          </li>
          <li class="whitespace-nowrap">
            get <Emphasis color="magenta">noting</Emphasis>
          </li>
        </ul>
      </nav>
      <main>
        <section class="flex flex-col items-center w-full space-y-6 py-64">
          <h2 class="text-heading-1">It's time to get productive</h2>
          <p>Development tools by a dev, for devs (or at least one dev)</p>
        </section>
        <AppFeature
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
            list, and allows the user to complete tasks that will then stay on
            the date they were completed to make it easier to tell update
            stakeholders in meetings such as stand-ups on tasks that were
            completed on a certain day.
          </p>
        </AppFeature>
        <Feature
          class="bg-cyan text-white"
          left={<TaskingSkeleton />}
          right={
            <p class="text-heading-3">
              Add details to your tasks to keep track of context
            </p>
          }
        />
        <Feature
          left={
            <p class="text-heading-3">
              Create and assign custom tags to easily organize your tasks from
              start to finish
            </p>
          }
          right={
            <div class="space-y-8 flex flex-col items-center justify-center">
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
        <CallToAction color="cyan" title="tasking" />
      </main>
    </>
  )
}
