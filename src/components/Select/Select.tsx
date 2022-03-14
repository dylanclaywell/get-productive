import { JSX, createSignal } from 'solid-js'
import { v4 } from 'uuid'
import classnames from 'classnames'

import styles from './Select.module.css'

interface Option<ValueType> {
  value: ValueType
  label: string
}

export interface Props<ValueType> {
  value: ValueType
  options: Option<ValueType>[]
  label: string
  classes?: {
    root?: string
    input?: string
    label?: string
  }
  fullWidth?: boolean
  onChange: JSX.EventHandler<HTMLSelectElement, Event>
  onFocus?: JSX.EventHandler<HTMLInputElement, FocusEvent>
  onBlur?: JSX.EventHandler<HTMLInputElement, FocusEvent>
  onClick?: JSX.EventHandler<HTMLInputElement, MouseEvent>
}

export default function Select<
  ValueType extends string | number | string[] | undefined
>(props: Props<ValueType>) {
  const [getIsFocused, setIsFocused] = createSignal(false)
  const id = `input-${v4()}`

  const onFocus: JSX.EventHandler<HTMLInputElement, FocusEvent> = (event) => {
    setIsFocused(true)
    props.onFocus?.(event)
  }

  const onBlur: JSX.EventHandler<HTMLInputElement, FocusEvent> = (event) => {
    setIsFocused(false)
    props.onBlur?.(event)
  }

  return (
    <>
      <select value={props.value} onChange={props.onChange}>
        {props.options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
      <div className={classnames(styles.container, props.classes?.root)}>
        <label
          htmlFor={id}
          className={classnames(
            styles.label,
            {
              [styles['label-small']]: getIsFocused() || Boolean(props.value),
              [styles['label-focused']]: getIsFocused(),
            },
            props.classes?.label
          )}
        >
          {props.label}
        </label>
        <div>asdf</div>
        {/* <input
          id={id}
          className={classnames(
            styles.input,
            {
              [styles['input-focused']]: getIsFocused(),
              [styles['input-full-width']]: Boolean(props.fullWidth),
            },
            props.classes?.input
          )}
          onClick={props.onClick}
          onInput={props.onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          value={props.value}
        /> */}
      </div>
    </>
  )
}
