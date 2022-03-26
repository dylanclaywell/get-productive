import { createSignal, JSX } from 'solid-js'
import { v4 } from 'uuid'
import classnames from 'classnames'

import styles from './TextField.module.css'

interface BaseProps {
  label: string
  value: string
  classes?: {
    root?: string
    input?: string
    label?: string
  }
  fullWidth?: boolean
  isDisabled?: boolean
}

interface TextFieldProps {
  multiline?: false | undefined
  forwardRef?: (el: HTMLInputElement) => void
  onClick?: JSX.EventHandler<HTMLInputElement, MouseEvent>
  onChange?: JSX.EventHandler<HTMLInputElement, InputEvent>
  onFocus?: JSX.EventHandler<HTMLInputElement, FocusEvent>
  onBlur?: JSX.EventHandler<HTMLInputElement, FocusEvent>
}

interface TextAreaProps {
  multiline: true
  forwardRef?: (el: HTMLTextAreaElement) => void
  onClick?: JSX.EventHandler<HTMLTextAreaElement, MouseEvent>
  onChange?: JSX.EventHandler<HTMLTextAreaElement, InputEvent>
  onFocus?: JSX.EventHandler<HTMLTextAreaElement, FocusEvent>
  onBlur?: JSX.EventHandler<HTMLTextAreaElement, FocusEvent>
}

export type Props = BaseProps & (TextFieldProps | TextAreaProps)

export default function TextField(props: Props) {
  const [getIsFocused, setIsFocused] = createSignal(false)
  const id = `input-${v4()}`

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
      {props.multiline ? (
        <textarea
          id={id}
          ref={props.forwardRef}
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
          onFocus={(event) => {
            setIsFocused(true)
            props.onFocus?.(event)
          }}
          onBlur={(event) => {
            setIsFocused(false)
            props.onBlur?.(event)
          }}
          value={props.value}
          disabled={props.isDisabled}
          readOnly={props.isDisabled}
        />
      ) : (
        <input
          id={id}
          ref={props.forwardRef}
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
          onFocus={(event) => {
            setIsFocused(true)
            props.onFocus?.(event)
          }}
          onBlur={(event) => {
            setIsFocused(false)
            props.onBlur?.(event)
          }}
          value={props.value}
          disabled={props.isDisabled}
          readOnly={props.isDisabled}
        />
      )}
    </div>
  )
}
