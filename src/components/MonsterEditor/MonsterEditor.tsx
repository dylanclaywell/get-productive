import { createSignal, JSX } from 'solid-js'
import MonsterBody from './MonsterBody'
import type { Props } from './MonsterBody'
import EditorFieldset from './EditorFieldset'

const initialBorderRadius = {
  topLeft: 0,
  topRight: 0,
  bottomLeft: 0,
  bottomRight: 0,
}

export default function MonsterEditor() {
  const [getBorderRadius, setBorderRadius] =
    createSignal<Props['borderRadius']>(initialBorderRadius)

  const onChange: (
    key: keyof typeof initialBorderRadius
  ) => JSX.EventHandler<HTMLInputElement, InputEvent> = (key) => (event) => {
    setBorderRadius({
      ...getBorderRadius(),
      [key]: event.currentTarget.value,
    })
  }

  const onBlur: (
    key: keyof typeof initialBorderRadius
  ) => JSX.EventHandler<HTMLInputElement, FocusEvent> = (key) => (event) => {
    if (!/^\d+$/.test(event.currentTarget.value)) {
      console.log(key, 'set radius')
      setBorderRadius({
        ...getBorderRadius(),
        [key]: 0,
      })
    }
  }

  return (
    <>
      <div className="border border-black w-40 h-40 m-auto my-4 flex justify-center items-center">
        <MonsterBody
          borderRadius={getBorderRadius()}
          width={100}
          height={100}
        />
      </div>
      <EditorFieldset
        columns={2}
        heading="Body Corners"
        fields={[
          {
            type: 'textfield',
            label: 'Top Left',
            value: getBorderRadius().topLeft.toString(),
            onChange: onChange('topLeft'),
            onBlur: onBlur('topLeft'),
          },
          {
            type: 'textfield',
            label: 'Top Right',
            value: getBorderRadius().topRight.toString(),
            onChange: onChange('topRight'),
            onBlur: onBlur('topRight'),
          },
          {
            type: 'textfield',
            label: 'Bottom Left',
            value: getBorderRadius().bottomLeft.toString(),
            onChange: onChange('bottomLeft'),
            onBlur: onBlur('bottomLeft'),
          },
          {
            type: 'textfield',
            label: 'Bottom Right',
            value: getBorderRadius().bottomRight.toString(),
            onChange: onChange('bottomRight'),
            onBlur: onBlur('bottomRight'),
          },
        ]}
      />
    </>
  )
}
