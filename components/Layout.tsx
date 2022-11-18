import c from 'classnames'
import { useContext } from 'react'
import { ThemeContext } from '../contexts/theme'

const ThemeSwitcher = () => {
  const { theme, setTheme } = useContext(ThemeContext)
  const style = {
    dark: 'text-white',
    light: 'text-black',
  }

  return (
    <div className="absolute right-6 top-0 z-10">
      <button
        aria-label="toggle the color theme"
        className={c(
          style[theme],
          'font-extralight text-xs w-20 text-left h-11 flex justify-around items-center'
        )}
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {
          <>
            <span>{`[ ${theme}`}</span> <span>{`mode ]`}</span>
          </>
        }
      </button>
    </div>
  )
}

const ThemedBG = () => {
  const { theme } = useContext(ThemeContext)

  const style = {
    dark: 'bg-black',
    light: 'bg-[#fdf5d0]',
  }
  return (
    <div
      className={c(
        'fixed top-0 left-0 right-0 bottom-0 w-full h-full z-0',
        style[theme]
      )}
    ></div>
  )
}

function Layout({ children }: { children: React.ReactNode }) {
  const { theme } = useContext(ThemeContext)
  const style = {
    dark: 'border-opacity-30 border-white',
    light: 'border-black border-opacity-50',
  }
  return (
    <>
      <ThemedBG />
      <ThemeSwitcher />
      <div className="w-full h-full px-6 py-11 overflow-hidden">
        <div
          className={c(
            'h-full w-full box-border relative border overflow-hidden',
            style[theme]
          )}
        >
          <main className="w-full h-full overflow-scroll p-4 md:px-12">
            {children}
          </main>
        </div>
      </div>
    </>
  )
}

export default Layout
