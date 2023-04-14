import { useContext } from 'react'
import DarkModeContext from '../context/DarkMode'

export const useDarkMode = () => {
  return useContext(DarkModeContext)
}
