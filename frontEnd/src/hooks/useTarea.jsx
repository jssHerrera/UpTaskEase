import { useContext } from 'react'
import TareaContext from '../context/TareaProvider'

export const useTarea = () => {
  return useContext(TareaContext)
}
