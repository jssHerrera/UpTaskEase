import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { ProyectoLayout } from '../layouts/ProyectoLayout'

const PrivateRoute = () => {
  const { auth, cargando } = useAuth()

  if (cargando) {
    return 'cargando'
  }
  const value = Object.entries(auth).length !== 0

  return (
    <>
      {value
        ? <ProyectoLayout />
        : <Navigate to='/' />}
    </>
  )
}

export default PrivateRoute
