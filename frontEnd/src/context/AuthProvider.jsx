import { useState, useEffect, createContext } from 'react'
import { getConfig } from '../helpers/getConfigHeaders'
import { perilOfUser } from '../services/Uptask.api'
import { isExpired } from 'react-jwt'
const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({})
  const [alerta, setAlerta] = useState({})
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
  // eslint-disable-next-line no-undef
    const token = localStorage.getItem('token')
    if (!token) {
      setCargando(false)
      return
    }

    const isMyTokenExpired = isExpired(token)
    if (isMyTokenExpired) {
      setCargando(false)
      return
    }

    const config = getConfig()

    perilOfUser(config)
      .then(elem => {
        setAuth(elem.data.result)
      })
      .catch(error => {
        console.log(error.response.data.message)
        setAuth({})
      })
      .finally(() => {
        setCargando(false)
      }
      )
  }, [])

  return (
    <AuthContext.Provider
      value={{
        alerta,
        setAlerta,
        auth,
        cargando,
        setAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export {
  AuthProvider
}

export default AuthContext
