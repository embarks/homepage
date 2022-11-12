import React, { FC, useEffect, useMemo, useState } from 'react'

export const Timer: FC<{ startTime?: Date }> = ({
  startTime = new Date('Tue Aug 04 1992 10:58:00 GMT+0000'),
}) => {
  const memo = useMemo(() => {
    const birthDate = startTime
    const today = new Date()
    let delta = today.getTime() - birthDate.getTime()
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
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  })

  const { days, hours, minutes, seconds, milliseconds } = memo
  useEffect(() => {
    setTime({
      hours: days * 24 + hours,
      minutes,
      seconds,
      milliseconds,
    })
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
    <>
      {`${time.hours.toString().padStart(6, '0')}:${time.minutes
        .toString()
        .padStart(2, '0')}:${time.seconds
        .toString()
        .padStart(2, '0')}:${time.milliseconds.toString().padStart(2, '0')}
    `}
    </>
  )
}

export default Timer
