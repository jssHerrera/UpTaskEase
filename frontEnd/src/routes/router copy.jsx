import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import {
  Proyectos,
  NuevoProyecto,
  ProyectoID,
  EditarProyecto
} from '../pages'

const LayoutComponents = lazy(() => import('../layouts/LayoutComponents'))
const PrivateRoute = lazy(() => import('./PrivateRoute'))
const PublicRoute = lazy(() => import('./PublicRoute'))
const Login = lazy(() => import('../pages/Auth/Login'))
const OlvidePassword = lazy(() => import('../pages/Auth/OlvidePassword'))
const ConfirmarCuenta = lazy(() => import('../pages/Auth/ConfirmarCuenta'))
const NuevoPassword = lazy(() => import('../pages/Auth/NuevoPassword'))
const Registrar = lazy(() => import('../pages/Auth/Registrar'))

export const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<p>Loading...</p>}>
        <LayoutComponents />
      </Suspense>
    ),
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <PublicRoute />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <Login />
              </Suspense>
            )
          },
          {
            path: 'registrar',
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <Registrar />
              </Suspense>
            )
          },
          {
            path: 'olvidePassword',
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <OlvidePassword />
              </Suspense>
            )
          },
          {
            path: 'nuevoPassword/:token',
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <NuevoPassword />
              </Suspense>
            )
          },
          {
            path: 'confirmarCuenta/:id',
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <ConfirmarCuenta />
              </Suspense>
            )
          }
        ]
      },
      {
        path: '/proyectos',
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <Proyectos />
          },
          {
            path: 'crear-proyecto',
            element: <NuevoProyecto />
          },
          {
            path: ':id',
            element: <ProyectoID />
          },
          {
            path: 'editar/:id',
            element: <EditarProyecto />
          }
        ]
      }
    ]
  }
])
