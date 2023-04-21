import { JSXElement } from 'solid-js'

import { AppFeature } from './AppFeature'
import { Emphasis } from './Emphasis'
import { Feature } from './Feature'
import { Skeleton } from './Skeleton'
import { CallToAction } from './CallToAction'

export function GetNoting(): JSXElement {
  return (
    <>
      <AppFeature
        backgroundSrc="src/assets/magenta-circle.svg"
        color="magenta"
        title="noting"
        iconSrc="src/assets/get-noting-icon.svg"
        imageSrc="src/assets/get-noting-laptop.svg"
        flip
      >
        <p>
          get <Emphasis color="magenta">noting</Emphasis> is a simple note
          taking app with inspiration drawn from Apple Notes.
        </p>
        <p>
          It was created with the goal of showcasing my user interface skills as
          well as creating a simple application to store notes.
        </p>
      </AppFeature>
      <Feature
        flip
        class="bg-magenta text-white"
        left={<Skeleton />}
        right={
          <p class="text-heading-3 font-normal">
            Write anything from short notes to stories
          </p>
        }
      />
      <Feature
        flip
        left={
          <p class="text-heading-3 font-normal">
            Use Markdown to add emphasis and organization to your notes
          </p>
        }
        right={
          <div class="space-y-8 flex flex-col items-center justify-center w-full">
            <img class="shadow-md rounded-md" src="src/assets/before.svg" />
            <img class="drop-shadow-md" src="src/assets/arrow.svg" />
            <img class="shadow-md rounded-md" src="src/assets/after.svg" />
          </div>
        }
      />
      <CallToAction
        color="magenta"
        title="noting"
        sourceUrl="https://github.com/dylanclaywell/get-noting"
      />
    </>
  )
}
