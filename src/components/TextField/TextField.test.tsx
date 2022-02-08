import { screen, render } from 'solid-testing-library'
import userEvent from '@testing-library/user-event'

import TextField from './TextField'

test('it calls the onClick function when clicked', () => {
  const onClick = jest.fn()
  render(() => <TextField label="Text Field" onClick={onClick} value="" />)

  const input = screen.getByRole('textbox', { name: /text field/i })

  userEvent.click(input)

  expect(onClick).toHaveBeenCalledTimes(1)
})

test('it calls the onChange function when the user types', () => {
  const onChange = jest.fn()
  render(() => <TextField label="Text Field" onChange={onChange} value="" />)

  const input = screen.getByRole('textbox', { name: /text field/i })

  userEvent.type(input, 'test')

  expect(onChange).toHaveBeenCalledTimes(4)
})
