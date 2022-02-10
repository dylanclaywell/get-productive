import { lazy } from 'solid-js'

export default [
  {
    path: '/',
    component: lazy(() => import('./pages/monsters')),
  },
  {
    path: '/editor',
    component: lazy(() => import('./pages/editor')),
  },
  {
    path: '/settings',
    component: lazy(() => import('./pages/settings')),
  },
]
