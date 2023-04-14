import { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const AuthLayout = lazy(() => import('../layouts/AuthLayout'))

const PublicRoute = () => {
  const { auth, cargando } = useAuth()

  if (cargando) {
    return 'cargando'
  }

  const value = Object.entries(auth).length === 0

  return (
    <>
      {value
        ? (
          <Suspense fallback={<p>loading...</p>}>
            <AuthLayout />
          </Suspense>
          )
        : <Navigate to='/proyectos' />}
    </>
  )
}

export default PublicRoute
