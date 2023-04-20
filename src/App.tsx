import type { Component } from "solid-js";

import GetTaskingLaptop from "./assets/get-tasking-laptop.svg";
import { Emphasis } from "./components/Emphasis";

const App: Component = () => {
  return (
    <>
      <nav class="flex justify-between p-4 items-center">
        <h1 class="text-heading-1 whitespace-nowrap">
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
        <section class="flex flex-col items-center w-screen space-y-6">
          <h2 class="text-heading-1">It's time to get productive</h2>
          <p>Development tools by a dev, for devs (or at least one dev)</p>
        </section>
        <section class="grid grid-cols-12 gap-4 py-24">
          <div class="col-start-2 col-span-5">
            <h3 class="text-heading-3">
              get <Emphasis color="cyan">tasking</Emphasis>
            </h3>
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
          </div>
          <div class="col-start-7 col-span-5 bg-blue-400 w-full h-full">
            <GetTaskingLaptop width="" height="" />
          </div>
        </section>
        <section class="grid grid-cols-12 gap-4 bg-cyan text-white py-16">
          <div class="col-start-2 col-span-5 bg-blue-400 w-full h-full"></div>
          <div class="col-start-7 col-span-5">
            <p class="text-lg">
              Add details to your tasks to keep track of context
            </p>
          </div>
        </section>
        <section class="grid grid-cols-12 gap-4">
          <div class="col-start-2 col-span-5">
            <p class="text-lg">
              Create and assign custom tags to easily organize your tasks from
              start to finish
            </p>
          </div>
          <div class="col-start-7 col-span-5 bg-blue-400 w-full h-full"></div>
        </section>
        <section class="flex flex-col items-center">
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
};

export default App;
