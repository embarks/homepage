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
    <div className="absolute right-6 top-0 z-20">
      <button
        aria-label="toggle the color theme"
        className={c(
          style[theme],
          'font-extralight font-sans text-xs w-20 text-left h-11 flex justify-around items-center'
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
  return (
    <>
      <noscript>
        <div
          style={{
            margin: '0 auto',
            maxWidth: '40rem',
            padding: '1rem',
            fontFamily: 'monospace',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <span
            style={{
              fontSize: '4em',
              backgroundColor: '#fdf5d0',
              display: 'inline-block',
              border: '1px solid black',
              borderRadius: '2px',
              padding: '1rem',
              pointerEvents: 'none',
              boxShadow: '0 2px 4px 1px rgba(0,0,0,0.1)',
            }}
          >
            🌊
          </span>
          <ul
            style={{
              listStyle: 'none',
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              padding: 0,
              gap: '1rem',
            }}
          >
            <li>
              <a href="mailto:emily@emwaves.org">email</a>
            </li>
            <li>
              <a href="https://linkedin.com/in/thebartman">linkedin</a>
            </li>
            <li>
              <a href="https://github.com/embarks">github</a>
            </li>
          </ul>
          <h1>Emily Bartman</h1>
          <h2>Information Technology Design</h2>
          <section
            style={{
              textAlign: 'left',
              marginTop: '4rem',
            }}
          >
            <h3>about</h3>
            <input type="date" disabled value="2024-04-05" />
            <p>
              Just read: <em>Shogun</em> by James Clavell.
            </p>
            <p>
              Currently reading: <em>The Expanse</em> series by James S.A.
              Corey.
            </p>
            <p>
              I am a designer and developer with a background in art and
              computer science. I graduated from university in 2016 from{' '}
              <a href="https://nau.edu">Northern Arizona University</a>. I
              currently work for{' '}
              <a href="https://www.harrys.com/en/us">Harry's</a> as a director
              of software engineering. I've also worked at{' '}
              <a href="https://formidable.com">Formidable</a>,{' '}
              <a href="https://gdmissionsystems.com/">General Dynamics</a>, and
              the{' '}
              <a href="https://www.usgs.gov/centers/astrogeology-science-center">
                USGS Astrogeology Science Center
              </a>
              .
            </p>
            <p>
              I love to teach about web development and collaboration. I have
              lectured and mentored at my alma mater and at various workshops,
              and it is a significant part of my career as a manager. I've
              delivered several talks on pair programming, version control, peer
              review, career success, and new developments in the tech industry.
            </p>
            <p>
              I value collective knowledge, freedom of speech, and fostering my
              connection to Earth and nature. I rely on reason, friendship, and
              good humor to guide my life. While I am not currently looking for
              work, I am always open to new connections and opportunities.
            </p>
            <br />
            <hr style={{ width: '50%' }} />
            <br />
            <p>
              “What should young people do with their lives today? Many things,
              obviously. But the most daring thing is to create stable
              communities in which the terrible disease of loneliness can be
              cured.” - Kurt Vonnegut, <em>Palm Sunday</em>
            </p>
          </section>
        </div>
        <style>
          {`
          html {
            background: #fdf5d0;
          }
          #app {
            display: none;
          }
        `}
        </style>
      </noscript>
      <div id="app" className="h-full">
        <ThemedBG />
        <ThemeSwitcher />
        <div className="h-full w-full box-border relative overflow-hidden">
          {children}
        </div>
      </div>
    </>
  )
}

export default Layout
