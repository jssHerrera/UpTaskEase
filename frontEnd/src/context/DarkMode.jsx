import { createContext, useCallback, useEffect, useState } from 'react'

const DarkModeContext = createContext()

export const DarkModeProvider = ({ children }) => {
  const [theme, setTheme] = useState(undefined)

  const toggleTheme = useCallback(() => {
    setTheme(!theme)
  }, [theme])

  useEffect(() => {
    if (theme) {
      // eslint-disable-next-line no-undef
      localStorage.setItem('darkMode', 'true')
      window.document.documentElement.classList.add('dark')
    } else if (theme === false) {
      // eslint-disable-next-line no-undef
      localStorage.setItem('darkMode', 'false')
      window.document.documentElement.classList.remove('dark')
    } else {
      // eslint-disable-next-line no-undef
      setTheme(localStorage.getItem('darkMode') === 'true')
    }
  }, [theme])

  return (
    <DarkModeContext.Provider
      value={{ theme, toggleTheme }}
    >
      {children}
    </DarkModeContext.Provider>
  )
}

export default DarkModeContext
