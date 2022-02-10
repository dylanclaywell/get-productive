import { Index, JSX } from 'solid-js'

import TextField from '../TextField'

import styles from './EditorFieldset.module.css'

export interface Field {
  type: 'select' | 'textfield'
  label: string
  value: string
  onChange?: JSX.EventHandler<HTMLInputElement, InputEvent>
  onBlur?: JSX.EventHandler<HTMLInputElement, FocusEvent>
  columnSpan?: number
}

export interface Props {
  heading: string
  fields: Field[]
  columns: number
}

export default function EditorFieldset(props: Props) {
  return (
    <div className="max-w-[40rem] m-auto p-4 border border-gray-200">
      <h2 className="text-xl mb-4 text-gray-700">{props.heading}</h2>
      <div className={`grid ${styles[`columns-${props.columns}`]} gap-4`}>
        <Index each={props.fields}>
          {(getField) => {
            switch (getField().type) {
              case 'textfield':
                return (
                  <TextField
                    label={getField().label}
                    value={getField().value}
                    fullWidth
                    onChange={getField().onChange}
                    onBlur={getField().onBlur}
                    classes={{
                      root: styles[`column-span-${getField().columnSpan ?? 1}`],
                    }}
                  />
                )
            }
          }}
        </Index>
      </div>
    </div>
  )
}
