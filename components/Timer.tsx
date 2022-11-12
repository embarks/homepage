// react timer that displays time in the following format:
// HH:MM:SS:MS
//

import React, { FC, useEffect, useMemo, useState } from 'react'

export const Timer: FC<{ startTime?: Date }> = ({
  startTime = new Date('1992-08-04 03:58:00'),
}) => {
  const { days, hours, minutes, seconds, milliseconds } = useMemo(() => {
    const birthDate = startTime
    let delta = Date.now() - birthDate.getTime()
    const days = Math.floor(delta / 86400000)
    delta -= days * 86400000
    const hours = Math.floor(delta / 3600000) % 24
    delta -= hours * 3600000
    const minutes = Math.floor(delta / 60000) % 60
    delta -= minutes * 60000
    const seconds = Math.floor(delta / 1000) % 60
    delta -= seconds * 1000
    const milliseconds = Math.floor(delta / 10) % 100
    return {
      days,
      hours,
      minutes,
      seconds,
      milliseconds,
    }
  }, [startTime])

  const [time, setTime] = useState({
    hours: days * 24 + hours,
    minutes,
    seconds,
    milliseconds,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => {
        const { hours, minutes, seconds, milliseconds } = time
        if (milliseconds === 99) {
          if (seconds === 59) {
            if (minutes === 59) {
              return {
                hours: hours + 1,
                minutes: 0,
                seconds: 0,
                milliseconds: 0,
              }
            }
            return {
              hours,
              minutes: minutes + 1,
              seconds: 0,
              milliseconds: 0,
            }
          }
          return {
            hours,
            minutes,
            seconds: seconds + 1,
            milliseconds: 0,
          }
        }
        return {
          hours,
          minutes,
          seconds,
          milliseconds: milliseconds + 1,
        }
      })
    }, 10)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      {`
      ${time.hours.toString().padStart(4, '0')}:${time.minutes
        .toString()
        .padStart(2, '0')}:${time.seconds
        .toString()
        .padStart(2, '0')}:${time.milliseconds.toString().padStart(2, '0')}
    `}
    </div>
  )
}
