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

const initialSize = {
  width: 100,
  height: 100,
}

export default function MonsterEditor() {
  const [getBorderRadius, setBorderRadius] =
    createSignal<Props['borderRadius']>(initialBorderRadius)
  const [getSize, setSize] =
    createSignal<{ width: Props['width']; height: Props['height'] }>(
      initialSize
    )

  const onBorderChange: (
    key: keyof typeof initialBorderRadius
  ) => JSX.EventHandler<HTMLInputElement, InputEvent> = (key) => (event) => {
    setBorderRadius({
      ...getBorderRadius(),
      [key]: event.currentTarget.value,
    })
  }

  const onSizeChange: (
    key: keyof typeof initialSize
  ) => JSX.EventHandler<HTMLInputElement, InputEvent> = (key) => (event) => {
    setSize({
      ...getSize(),
      [key]: event.currentTarget.value,
    })
  }

  const onBorderRadiusBlur: (
    key: keyof typeof initialBorderRadius
  ) => JSX.EventHandler<HTMLInputElement, FocusEvent> = (key) => (event) => {
    if (!/^\d+$/.test(event.currentTarget.value)) {
      setBorderRadius({
        ...getBorderRadius(),
        [key]: 0,
      })
    }
  }

  const onSizeBlur: (
    key: keyof typeof initialSize
  ) => JSX.EventHandler<HTMLInputElement, FocusEvent> = (key) => (event) => {
    if (!/^\d+$/.test(event.currentTarget.value)) {
      setSize({
        ...getSize(),
        [key]: 0,
      })
    }
  }

  return (
    <>
      <div className="border border-black w-40 h-40 m-auto my-4 flex justify-center items-center">
        <MonsterBody
          borderRadius={getBorderRadius()}
          width={getSize().width}
          height={getSize().height}
        />
      </div>
      <div className="space-y-8">
        <EditorFieldset
          columns={2}
          heading="Body Size"
          fields={[
            {
              label: 'Width',
              type: 'textfield',
              value: getSize().width.toString(),
              onChange: onSizeChange('width'),
              onBlur: onSizeBlur('width'),
            },
            {
              label: 'Height',
              type: 'textfield',
              value: getSize().height.toString(),
              onChange: onSizeChange('height'),
              onBlur: onSizeBlur('height'),
            },
          ]}
        />
        <EditorFieldset
          columns={2}
          heading="Body Corners"
          fields={[
            {
              type: 'textfield',
              label: 'Top Left',
              value: getBorderRadius().topLeft.toString(),
              onChange: onBorderChange('topLeft'),
              onBlur: onBorderRadiusBlur('topLeft'),
            },
            {
              type: 'textfield',
              label: 'Top Right',
              value: getBorderRadius().topRight.toString(),
              onChange: onBorderChange('topRight'),
              onBlur: onBorderRadiusBlur('topRight'),
            },
            {
              type: 'textfield',
              label: 'Bottom Left',
              value: getBorderRadius().bottomLeft.toString(),
              onChange: onBorderChange('bottomLeft'),
              onBlur: onBorderRadiusBlur('bottomLeft'),
            },
            {
              type: 'textfield',
              label: 'Bottom Right',
              value: getBorderRadius().bottomRight.toString(),
              onChange: onBorderChange('bottomRight'),
              onBlur: onBorderRadiusBlur('bottomRight'),
            },
          ]}
        />
      </div>
    </>
  )
}
