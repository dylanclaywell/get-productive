import { JSXElement } from 'solid-js'

import { AppFeature } from './AppFeature'
import { Emphasis } from './Emphasis'
import { Feature } from './Feature'
import { Skeleton } from './Skeleton'
import { CallToAction } from './CallToAction'
import { MarkdownImages } from './MarkdownImages'

import magentaCircle from '../assets/magenta-circle.svg'
import getJottingIcon from '../assets/get-jotting-icon.svg'
import getJottingLaptop from '../assets/get-jotting-laptop.svg'

export function GetJotting(): JSXElement {
  return (
    <>
      <AppFeature
        id="get-jotting"
        backgroundSrc={magentaCircle}
        appImageAlt="Screenshot from Get Jotting"
        iconAlt="Get Jotting icon"
        color="magenta"
        title="jotting"
        iconSrc={getJottingIcon}
        imageSrc={getJottingLaptop}
        flip
        flipOnMobile={false}
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
        binaryUrl="https://storage.googleapis.com/application-binaries/get-noting/get-jotting_0.2.0_x64_en-US.msi"
        sourceUrl="https://github.com/dylanclaywell/get-jotting"
      />
    </>
  )
}
