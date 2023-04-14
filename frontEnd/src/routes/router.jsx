import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import LayoutComponents from '../layouts/LayoutComponents'
import SuspenseRoute from './SuspenseRouter'
// public router
const PublicRoute = SuspenseRoute(() => import('./PublicRoute'))
const Login = SuspenseRoute(() => import('../pages/Auth/Login'))
const OlvidePassword = SuspenseRoute(() => import('../pages/Auth/OlvidePassword'))
const ConfirmarCuenta = SuspenseRoute(() => import('../pages/Auth/ConfirmarCuenta'))
const NuevoPassword = SuspenseRoute(() => import('../pages/Auth/NuevoPassword'))
const Registrar = SuspenseRoute(() => import('../pages/Auth/Registrar'))

// PRIVATE ROUTER
const PrivateRoute = SuspenseRoute(() => import('./PrivateRoute'))
const Proyectos = SuspenseRoute(() => import('../pages/Proyecto/Proyectos'))
const NuevoProyecto = SuspenseRoute(() => import('../pages/Proyecto/NuevoProyecto'))
const ProyectoID = SuspenseRoute(() => import('../pages/Proyecto/ProyectoID'))
const EditarProyecto = SuspenseRoute(() => import('../pages/Proyecto/EditarProyecto'))

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<LayoutComponents />}>
      <Route path='/' element={<PublicRoute />}>
        <Route
          index
          element={<Login />}
        />
        <Route
          path='registrar'
          element={<Registrar />}
        />
        <Route
          path='olvidePassword'
          element={<OlvidePassword />}
        />
        <Route
          path='nuevoPassword/:token'
          element={<NuevoPassword />}
        />
        <Route
          path='confirmarCuenta/:id'
          element={<ConfirmarCuenta />}
        />
      </Route>
      <Route path='/proyectos' element={<PrivateRoute />}>
        <Route
          index
          element={<Proyectos />}
        />
        <Route
          path='crear-proyecto'
          element={<NuevoProyecto />}
        />
        <Route
          path=':id'
          element={<ProyectoID />}
        />
        <Route
          path='editar/:id'
          element={<EditarProyecto />}
        />
      </Route>
    </Route>
  )

)
