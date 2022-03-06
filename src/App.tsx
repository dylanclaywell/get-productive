import { Router, useRoutes } from 'solid-app-router'

import routes from './routes'

export default function App() {
  const Routes = useRoutes(routes)

  return (
    <Router>
      <Routes />
    </Router>
  )
}
