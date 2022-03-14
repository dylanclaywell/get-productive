import { createSignal, JSX } from 'solid-js'
import { v4 } from 'uuid'
import classnames from 'classnames'

import styles from './TextField.module.css'

export interface Props {
  onClick?: JSX.EventHandler<HTMLInputElement, MouseEvent>
  onChange?: JSX.EventHandler<HTMLInputElement, InputEvent>
  onFocus?: JSX.EventHandler<HTMLInputElement, FocusEvent>
  onBlur?: JSX.EventHandler<HTMLInputElement, FocusEvent>
  label: string
  value: string
  classes?: {
    root?: string
    input?: string
    label?: string
  }
  fullWidth?: boolean
}

export default function TextField(props: Props) {
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
      <input
        id={id}
        className={classnames(
          styles.input,
          {
            [styles['input-focused']]: getIsFocused(),
            [styles['full-width']]: Boolean(props.fullWidth),
          },
          props.classes?.input
        )}
        onClick={props.onClick}
        onInput={props.onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        value={props.value}
      />
    </div>
  )
}
