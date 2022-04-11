import { createSignal, JSX } from 'solid-js'

import { useUser } from '../../contexts/User'
import Button from '../Button'
import TextField from '../TextField'

import styles from './LoginForm.module.css'

interface FormFields {
  email: string
  password: string
}

interface Props {
  onCreateAccount: () => void
}

export default function Login(props: Props) {
  const [, { login }] = useUser()
  const [getFormFields, setFormFields] = createSignal<FormFields>({
    email: '',
    password: '',
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
            login(getFormFields().email, getFormFields().password)
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
            <Button
              type="submit"
              fullWidth
              label="Log In"
              onClick={() => {
                login(getFormFields().email, getFormFields().password)
              }}
            />
            <div className={styles['create-account']}>
              Not registered?{' '}
              <a href="#" onClick={props.onCreateAccount}>
                Create Account
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
