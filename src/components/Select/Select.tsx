import { JSX, createSignal, For } from 'solid-js'
import { v4 } from 'uuid'
import classnames from 'classnames'

import styles from './Select.module.css'
import Menu from '../Menu'
import MenuItem from '../MenuItem'
import cloneDeep from 'lodash.clonedeep'

export interface Option<ValueType> {
  value: ValueType
  label: string
}

export interface PropsBase<ValueType> {
  options: Option<ValueType>[]
  label: string
  classes?: {
    root?: string
    input?: string
    label?: string
  }
  fullWidth?: boolean
  onFocus?: JSX.EventHandler<HTMLInputElement, FocusEvent>
  onBlur?: JSX.EventHandler<HTMLInputElement, FocusEvent>
  onClick?: JSX.EventHandler<HTMLInputElement, MouseEvent>
}

export interface MultiSelectProps<ValueType> extends PropsBase<ValueType> {
  values: ValueType[]
  onChange: (option: Option<ValueType>[]) => void
}

export interface SingleSelectProps<ValueType> extends PropsBase<ValueType> {
  value: ValueType
  onChange: (option: Option<ValueType>) => void
}

export type Props<ValueType> =
  | SingleSelectProps<ValueType>
  | MultiSelectProps<ValueType>

export default function Select<
  ValueType extends string | number | string[] | undefined
>(props: Props<ValueType>) {
  const [getMultiSelectValues, setMultiSelectValues] = createSignal<
    Option<ValueType>[]
  >(
    'values' in props
      ? props.values
          .map((value) => props.options.find((o) => o.value === value)!)
          .filter(Boolean) ?? []
      : []
  )
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
              [styles['label-small']]:
                getIsFocused() ||
                ('value' in props && Boolean(props.value)) ||
                ('values' in props && Boolean(props.values.length)),
              [styles['label-focused']]: getIsFocused(),
            },
            props.classes?.label
          )}
        >
          {props.label}
        </label>
        {'value' in props ? (
          <input
            id={id}
            ref={(el) => setInputRef(el)}
            className={classnames(
              styles.input,
              {
                [styles['input-focused']]: getIsFocused(),
                [styles['full-width']]: Boolean(props.fullWidth),
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
        ) : (
          <div
            ref={(el) => setInputRef(el)}
            className={classnames(
              styles.input,
              {
                [styles['input-focused']]: getIsFocused(),
                [styles['full-width']]: Boolean(props.fullWidth),
              },
              props.classes?.input,
              styles['multi-select-input']
            )}
            onClick={() => setIsMenuOpen(true)}
          >
            {props.values.map((value) => (
              <div className={styles['multi-select-value']}>
                {props.options.find((o) => o.value === value)?.label}
              </div>
            ))}
          </div>
        )}
      </div>
      <Menu
        isOpen={getIsMenuOpen()}
        anchor={getInputRef()}
        onClose={() => setIsMenuOpen(false)}
      >
        <For each={props.options}>
          {(option) => (
            <MenuItem
              classes={classnames({
                [styles['multi-select-selected']]:
                  'values' in props &&
                  props.values.some((value) => option.value === value),
              })}
              onClick={() => {
                if ('values' in props) {
                  setMultiSelectValues((values) => {
                    let clonedValues = cloneDeep(values)

                    if (clonedValues.some((v) => option.value === v.value)) {
                      clonedValues = clonedValues.filter(
                        (v) => v.value !== option.value
                      )
                      return clonedValues
                    }

                    return [...clonedValues, option]
                  })

                  props.onChange(getMultiSelectValues())
                } else {
                  props.onChange(option)
                }

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
