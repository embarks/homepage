import React, { createContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

export const ThemeContext = createContext({
  theme: 'dark',
  setTheme: (theme: Theme) => null,
})

const ThemeContextProvider = (props) => {
  const [theme, setTheme] = useState<Theme>('dark')
  const _setTheme = (theme) => {
    console.log('theme set', theme)
    setTheme(theme)
  }
  useEffect(() => {
    console.log('theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme: _setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider
