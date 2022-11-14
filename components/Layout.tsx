import c from 'classnames'
import { useContext, useEffect, useRef, useState } from 'react'
import { StarField } from 'starfield-react'
import { ThemeContext } from '../contexts/theme'

const fixedBgStyles: React.CSSProperties = {
  position: 'absolute',
  top: '0',
  left: '0',
  zIndex: -1,
  bottom: '0',
  right: '0',
  backgroundColor: 'black',
}

const CanvasBG = () => {
  const [canvasDims, setCanvasDims] = useState({
    width: undefined,
    height: undefined,
  })
  const bgRef = useRef<HTMLDivElement>(null)
  const { theme } = useContext(ThemeContext)

  const style = {
    dark: {
      star: 'white',
      bg: 'black',
    },
    light: {
      star: 'rgb(20, 20, 20)',
      bg: 'rgb(244, 244, 244)',
    },
  }

  useEffect(() => {
    if (bgRef.current) {
      const { width, height } = bgRef.current.getBoundingClientRect()
      setCanvasDims({ width, height })
    }
  }, [])

  useEffect(() => {
    if (bgRef.current) {
      window.addEventListener('resize', () => {
        if (bgRef.current) {
          const { width, height } = bgRef.current.getBoundingClientRect()
          setCanvasDims({
            width,
            height,
          })
        }
      })
    }
  }, [])

  return (
    <>
      <div
        ref={bgRef}
        style={{ ...fixedBgStyles, backgroundColor: style[theme].bg }}
      ></div>
      <StarField
        starRatio={169}
        style={fixedBgStyles}
        width={canvasDims.width}
        height={canvasDims.height}
        speed={0.1}
        fps={60}
        bgStyle={style[theme].bg}
        starStyle={style[theme].star}
      />
    </>
  )
}

const ThemeSwitcher = () => {
  const { theme, setTheme } = useContext(ThemeContext)
  const style = {
    dark: 'text-white',
    light: 'text-black',
  }

  return (
    <div className="absolute right-6 top-1 ">
      <button
        aria-label="toggle the color theme"
        className={c(
          style[theme],
          'font-extralight text-xs w-20 text-left h-7 flex justify-around items-center'
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
    light: 'bg-neutral-100',
  }
  return (
    <div
      className={c('fixed top-0 left-0 w-full h-full', style[theme])}
      style={{ zIndex: -1 }}
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
      <div className="w-full h-full px-6 py-8 overflow-hidden">
        <div
          className={c(
            'h-full w-full box-border relative border',
            style[theme]
          )}
        >
          <main className="w-full h-full overflow-scroll p-4 md:px-12 z-10">
            {children}
            <CanvasBG />
          </main>
        </div>
      </div>
    </>
  )
}

export default Layout
