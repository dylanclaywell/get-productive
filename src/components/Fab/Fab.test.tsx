import { screen, render } from 'solid-testing-library'
import userEvent from '@testing-library/user-event'

import Fab from './Fab'

test('it renders the Fab', () => {
  render(() => <Fab onClick={jest.fn()} icon={null} />)
  const fab = screen.getByRole('button')
  expect(fab).toBeInTheDocument()
})

test('it calls onClick when clicked', () => {
  const onClick = jest.fn()
  render(() => (
    <Fab onClick={onClick} icon={<i class="fa-solid fa-check"></i>} />
  ))

  const fab = screen.getByRole('button')
  userEvent.click(fab)

  expect(onClick).toHaveBeenCalledTimes(1)
})
