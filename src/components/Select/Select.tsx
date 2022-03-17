import { JSX, createSignal, For } from 'solid-js'
import { v4 } from 'uuid'
import classnames from 'classnames'

import styles from './Select.module.css'
import Menu from '../Menu'
import MenuItem from '../MenuItem'

export interface Option<ValueType> {
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
  onChange: (option: Option<ValueType>) => void
  onFocus?: JSX.EventHandler<HTMLInputElement, FocusEvent>
  onBlur?: JSX.EventHandler<HTMLInputElement, FocusEvent>
  onClick?: JSX.EventHandler<HTMLInputElement, MouseEvent>
}

export default function Select<
  ValueType extends string | number | string[] | undefined
>(props: Props<ValueType>) {
  const [getInputRef, setInputRef] = createSignal<HTMLDivElement>()
  const [getIsMenuOpen, setIsMenuOpen] = createSignal(false)
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
          ref={(el) => setInputRef(el)}
          className={classnames(
            styles.input,
            {
              [styles['input-focused']]: getIsFocused(),
              [styles['input-full-width']]: Boolean(props.fullWidth),
            },
            props.classes?.input
          )}
          onClick={() => setIsMenuOpen(true)}
          onFocus={onFocus}
          onBlur={onBlur}
          value={
            props.options.find((option) => option.value === props.value)
              ?.label ?? ''
          }
          readOnly
        />
      </div>
      <Menu
        isOpen={getIsMenuOpen()}
        anchor={getInputRef()}
        onClose={() => setIsMenuOpen(false)}
      >
        <For each={props.options}>
          {(option) => (
            <MenuItem
              onClick={() => {
                props.onChange(option)
                setIsMenuOpen(false)
              }}
            >
              {option.label}
            </MenuItem>
          )}
        </For>
      </Menu>
    </>
  )
}
