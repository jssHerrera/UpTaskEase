import { QueryClient, QueryClientProvider } from 'react-query'
import { Outlet } from 'react-router-dom'
import { AuthProvider } from '../context/AuthProvider'
import { ProyectoProvider } from '../context/ProyectoProvider'
import { TareaProvider } from '../context/TareaProvider'
import { DarkModeProvider } from '../context/DarkMode'

const LayoutComponents = () => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ProyectoProvider>
          <TareaProvider>
            <DarkModeProvider>
              <Outlet />
            </DarkModeProvider>
          </TareaProvider>
        </ProyectoProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}
export default LayoutComponents
