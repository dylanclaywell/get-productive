import { Router, useRoutes } from 'solid-app-router'
import Navigation from './components/Navigation'

import routes from './routes'

export default function App() {
  const Routes = useRoutes(routes)

  return (
    <Router>
      <Navigation />
      <Routes />
    </Router>
  )
}
