import type { JSXElement } from "solid-js";

import { AppFeature } from "./components/AppFeature";
import { Emphasis } from "./components/Emphasis";
import { Feature } from "./components/Feature";
import { TaskingSkeleton } from "./components/TaskingSkeleton";

export function App(): JSXElement {
  return (
    <>
      <nav class="flex justify-between p-4 items-center">
        <h1 class="text-heading-2 whitespace-nowrap">
          get <Emphasis color="cyan">productive</Emphasis>
        </h1>
        <ul class="flex space-x-2">
          <li>Home</li>
          <li>
            get <Emphasis color="cyan">tasking</Emphasis>
          </li>
          <li>
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
        <section class="grid grid-cols-12 gap-4 py-16">
          <div class="col-start-2 col-span-5 flex items-center justify-center">
            <p class="text-heading-3">
              Create and assign custom tags to easily organize your tasks from
              start to finish
            </p>
          </div>
          <div class="col-start-7 col-span-5 w-full h-full space-y-8 flex flex-col items-center justify-center">
            <div class="w-full bg-gray-200 p-4 flex items-center space-x-2 rounded-md">
              <div class="flex-shrink-0 w-12 h-12 bg-white rounded-md" />
              <span>Create shopping cart</span>
              <div class="bg-teal-400 px-3 py-1 text-xs rounded-full flex items-center justify-center whitespace-nowrap">
                In Progress
              </div>
            </div>
            <div class="w-full bg-gray-200 p-4 flex items-center space-x-2 rounded-md">
              <div class="flex-shrink-0 w-12 h-12 bg-white rounded-md" />
              <span>Design payment form</span>
              <div class="bg-yellow-100 px-3 py-1 text-xs rounded-full flex items-center justify-center whitespace-nowrap">
                Needs more info
              </div>
            </div>
            <div class="w-full bg-gray-200 p-4 flex items-center space-x-2 rounded-md">
              <div class="flex-shrink-0 w-12 h-12 bg-white rounded-md" />
              <span>Update project dependencies</span>
              <div class="bg-lime-500 px-3 py-1 text-xs rounded-full flex items-center justify-center whitespace-nowrap">
                Ready to deploy
              </div>
            </div>
          </div>
        </section>
        <section class="flex flex-col items-center mb-64 space-y-6 pt-6">
          <p class="text-heading-3">
            get <Emphasis color="cyan">tasking</Emphasis> today!
          </p>
          <button class="px-6 py-3 bg-cyan rounded-md text-white leading-6">
            Download
          </button>
        </section>
      </main>
    </>
  );
}
