export interface Props {
  title: string
  tagTitle: string
  tagColor: 'teal' | 'yellow' | 'lime'
}

export function Todo(props: Props) {
  return (
    <div class="w-full bg-gray-200 p-4 flex items-center space-x-4 rounded-md">
      <div class="flex-shrink-0 w-12 h-12 bg-white rounded-md" />
      <span>{props.title}</span>
      <div
        class="bg-teal-400 px-3 py-1 text-xs rounded-full flex items-center justify-center whitespace-nowrap"
        classList={{
          'bg-teal-400': props.tagColor === 'teal',
          'bg-yellow-100': props.tagColor === 'yellow',
          'bg-lime-500': props.tagColor === 'lime',
        }}
      >
        {props.tagTitle}
      </div>
    </div>
  )
}
