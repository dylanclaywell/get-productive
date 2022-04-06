import { Router, useRoutes } from 'solid-app-router'
import ThemeProvider from './contexts/Theme'

import routes from './routes'

export default function App() {
  const Routes = useRoutes(routes)

  return (
    <ThemeProvider>
      <Router>
        <Routes />
      </Router>
    </ThemeProvider>
  )
}
