import MessageProvider from './contexts/Message'
import ThemeProvider from './contexts/Theme'
import UserProvider from './contexts/User'
import Main from './pages/main'

export default function App() {
  return (
    <MessageProvider>
      <UserProvider>
        <ThemeProvider>
          <Main />
        </ThemeProvider>
      </UserProvider>
    </MessageProvider>
  )
}
