import React, { createContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

export const ThemeContext = createContext<{
  theme: Theme
  setTheme: (theme: Theme) => void
}>({
  theme: 'dark',
  setTheme: (_: Theme) => null,
})

const ThemeContextProvider = (props) => {
  const [theme, setTheme] = useState<Theme>('dark')
  const _setTheme = (theme) => {
    setTheme(theme)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: _setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider
