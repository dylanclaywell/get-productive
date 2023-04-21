import { Emphasis } from './Emphasis'

export interface Props {
  title: string
  color: 'cyan' | 'magenta'
  sourceUrl: string
}

export function CallToAction(props: Props) {
  return (
    <section class="flex flex-col items-center mb-64 space-y-6 pt-6">
      <p class="text-heading-3">
        get <Emphasis color={props.color}>{props.title}</Emphasis> today!
      </p>
      <button
        class="px-6 py-3 rounded-md text-white leading-6 font-bold"
        classList={{
          'bg-cyan': props.color === 'cyan',
          'bg-magenta': props.color === 'magenta',
        }}
      >
        Download
      </button>
      <a href={props.sourceUrl} rel="noreferrer noopener">
        View Source
      </a>
    </section>
  )
}
