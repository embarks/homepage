import { useContext } from 'react'
import { ThemeContext } from '../contexts/theme'

function SoftLogoTimes() {
  const { theme } = useContext(ThemeContext)

  return (
    <>
      <svg
        viewBox="50.134 80.376 350.433 119.322"
        xmlns="http://www.w3.org/2000/svg"
        className="hidden md:block"
      >
        <defs>
          <radialGradient
            gradientUnits="userSpaceOnUse"
            cx="29.407"
            cy="62.86"
            r="206.282"
            id="gradient-0"
            gradientTransform="matrix(0.381134, 0.478915, -1.362298, 0.460369, 133.904246, -28.893401)"
            spreadMethod="reflect"
          >
            <stop offset="0" style={{ stopColor: 'rgb(255, 0, 0)' }} />
            <stop offset="1" style={{ stopColor: 'rgba(255, 60, 0, 0)' }} />
          </radialGradient>
        </defs>
        <text
          style={{
            fill: theme == 'light' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)',
            fontFamily: 'Times New Roman',
            fontSize: '42px',
            paintOrder: 'fill',
            stroke: 'url(#gradient-0)',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeOpacity: '0.3',
            strokeWidth: '0.544913px',
            whiteSpace: 'pre',
          }}
          transform="matrix(0.849331, 0, 0, 1.303375, -21.822222, 51.838604)"
        >
          <tspan x="84.721" y="59.309">
            EMILY BARTMAN
          </tspan>
          <tspan x="84.721" dy="1em">
            ​
          </tspan>
          <tspan className="hover:cursor-grab active:cursor-grabbing">
            (soft){' '}
          </tspan>
          <tspan
            style={{
              fontSize: '56px',
            }}
          >
            SOLUTIONS
          </tspan>
        </text>
      </svg>
      <svg
        viewBox="49.936 80.229 343.57 153.616"
        xmlns="http://www.w3.org/2000/svg"
        className="md:hidden"
      >
        <defs>
          <radialGradient
            gradientUnits="userSpaceOnUse"
            cx="29.407"
            cy="62.86"
            r="206.282"
            id="gradient-0"
            gradientTransform="matrix(0.381134, 0.478915, -1.362298, 0.460369, 133.904246, -28.893401)"
            spreadMethod="reflect"
          >
            <stop
              offset="0"
              style={{
                stopColor: 'rgb(255, 0, 0)',
              }}
            />
            <stop
              offset="1"
              style={{
                stopColor: 'rgba(255, 60, 0, 0)',
              }}
            />
          </radialGradient>
          <radialGradient
            gradientUnits="userSpaceOnUse"
            cx="29.407"
            cy="62.86"
            r="206.282"
            id="gradient-1"
            gradientTransform="matrix(0.381134, 0.478915, -1.362298, 0.460369, 133.904246, -28.893401)"
            spreadMethod="reflect"
          >
            <stop
              offset="0"
              style={{
                stopColor: 'rgb(255, 0, 0)',
              }}
            />
            <stop
              offset="1"
              style={{
                stopColor: 'rgba(255, 60, 0, 0)',
              }}
            />
          </radialGradient>
        </defs>
        <text
          transform="matrix(0.849331, 0, 0, 1.303375, -21.083145, 51.838604)"
          style={{
            fill: theme == 'light' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)',
            fontFamily: 'Times New Roman',
            fontSize: '42px',
            paintOrder: 'fill',
            stroke: 'url(#gradient-0)',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeOpacity: '0.3',
            strokeWidth: '0.544913px',
            whiteSpace: 'pre',
          }}
        >
          <tspan x="84.721" y="59.309">
            EMILY{' '}
          </tspan>
          <tspan x="84.721" dy="0.7em">
            ​
          </tspan>
          <tspan>BARTMAN</tspan>
          <tspan x="84.721" dy="0.7em">
            ​
          </tspan>
        </text>
        <text
          style={{
            fill: theme == 'light' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)',
            fontFamily: 'Times New Roman',
            fontSize: '42px',
            letterSpacing: '-0.5px',
            paintOrder: 'fill',
            stroke: 'url(#gradient-1)',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeOpacity: '0.3',
            strokeWidth: '0.544913px',
            whiteSpace: 'pre',
          }}
          transform="matrix(0.849331, 0, 0, 1.303375, -22.020306, 140.956512)"
        >
          <tspan x="84.721" y="59.309">
            (soft){' '}
          </tspan>
          <tspan
            style={{
              fontSize: '56.0084px',
              lineHeight: '89.6135px',
            }}
          >
            SOLUTIONS
          </tspan>
        </text>
      </svg>
    </>
  )
}

export default SoftLogoTimes
