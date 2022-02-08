import { JSX } from 'solid-js'

export interface Props {
  onClick?: () => void
  onChange?: JSX.EventHandler<HTMLInputElement, Event>
  label: string
  value: string
}

export default function TextField({ onClick, onChange, label, value }: Props) {
  return (
    <label>
      {label}:<input onClick={onClick} onInput={onChange} value={value} />
    </label>
  )
}
