import { createSignal, JSX } from 'solid-js'

import { useUser } from '../../contexts/User'
import Button from '../Button'
import TextField from '../TextField'

import styles from './CreateAccountForm.module.css'

interface FormFields {
  email: string
  password: string
  confirmPassword: string
}

interface Props {
  onLogin: () => void
}

export default function CreateAccountForm(props: Props) {
  const [, { createAccount }] = useUser()
  const [getFormFields, setFormFields] = createSignal<FormFields>({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const onInputChange =
    (name: keyof FormFields): JSX.EventHandler<HTMLInputElement, InputEvent> =>
    (e) => {
      setFormFields({ ...getFormFields(), [name]: e.currentTarget.value })
    }

  return (
    <div className={styles.root}>
      <div className={styles['login-container']}>
        <h1 className={styles.logo}>
          get<span>PRODUCTIVE</span>
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            createAccount(getFormFields().email, getFormFields().password)
          }}
        >
          <div className={styles['inputs']}>
            <TextField
              label="Email"
              value={getFormFields().email}
              onChange={onInputChange('email')}
              fullWidth
            />
            <TextField
              type="password"
              label="Password"
              value={getFormFields().password}
              onChange={onInputChange('password')}
              fullWidth
            />
            {/* TODO create confirm password workflow */}
            <Button
              fullWidth
              label="Create Account"
              onClick={() => {
                createAccount(getFormFields().email, getFormFields().password)
              }}
            />
            <div className={styles['create-account']}>
              Have an account?{' '}
              <a href="#" onClick={props.onLogin}>
                Log in
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
