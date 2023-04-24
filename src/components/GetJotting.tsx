import { JSXElement } from 'solid-js'

import { AppFeature } from './AppFeature'
import { Emphasis } from './Emphasis'
import { Feature } from './Feature'
import { Skeleton } from './Skeleton'
import { CallToAction } from './CallToAction'
import { MarkdownImages } from './MarkdownImages'

export function GetJotting(): JSXElement {
  return (
    <>
      <AppFeature
        id="get-jotting"
        backgroundSrc="src/assets/magenta-circle.svg"
        color="magenta"
        title="jotting"
        iconSrc="src/assets/get-jotting-icon.svg"
        imageSrc="src/assets/get-jotting-laptop.svg"
        flip
      >
        <p>
          get <Emphasis color="magenta">jotting</Emphasis> is a simple note
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
        right={<MarkdownImages />}
      />
      <CallToAction
        color="magenta"
        title="jotting"
        sourceUrl="https://github.com/dylanclaywell/get-jotting"
      />
    </>
  )
}
