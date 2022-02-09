import classnames from 'classnames'

export const ValidRoundedValues = [
  'rounded-none',
  'rounded-sm',
  'rounded-md',
  'rounded-lg',
] as const

export type RoundedValue = typeof ValidRoundedValues[number]

export interface Props {
  borderRadius: {
    topLeft: number
    topRight: number
    bottomLeft: number
    bottomRight: number
  }
}

export default function MonsterBody(props: Props) {
  return (
    <div
      className={classnames('bg-red-700 w-12 h-12')}
      style={{
        'border-top-left-radius': `${props.borderRadius.topLeft}px`,
        'border-top-right-radius': `${props.borderRadius.topRight}px`,
        'border-bottom-left-radius': `${props.borderRadius.bottomLeft}px`,
        'border-bottom-right-radius': `${props.borderRadius.bottomRight}px`,
      }}
    ></div>
  )
}
