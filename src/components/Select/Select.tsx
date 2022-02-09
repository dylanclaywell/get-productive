import { JSX } from 'solid-js'

interface Option<ValueType> {
  value: ValueType
  label: string
}

export interface Props<ValueType> {
  value: ValueType
  options: Option<ValueType>[]
  onChange: JSX.EventHandler<HTMLSelectElement, Event>
}

export default function Select<
  ValueType extends string | number | string[] | undefined
>(props: Props<ValueType>) {
  return (
    <select value={props.value} onChange={props.onChange}>
      {props.options.map((option) => (
        <option value={option.value}>{option.label}</option>
      ))}
    </select>
  )
}
