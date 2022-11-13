import React, { FC, useEffect, useMemo, useState } from 'react'

interface Counter {
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
}

const timeUpdate = (isFuture: boolean) => (time: Counter) => {
  const { hours, minutes, seconds, milliseconds } = time

  const diff = isFuture ? -1 : 1
  const [nextMin, nextS, nextMs] = isFuture ? [59, 59, 99] : [0, 0, 0]
  const [tickMs, tickS, tickM] = isFuture
    ? [milliseconds === 0, seconds === 0, minutes === 0]
    : [milliseconds === 99, seconds === 59, minutes === 59]

  const newTimeMs = {
    hours,
    minutes,
    seconds,
    milliseconds: milliseconds + diff,
  }

  const newTimeS = {
    hours,
    minutes,
    seconds: seconds + diff,
    milliseconds: nextMs,
  }

  const newTimeM = {
    hours,
    minutes: minutes + diff,
    seconds: nextS,
    milliseconds: nextMs,
  }

  const newTimeH = {
    hours: hours + diff,
    minutes: nextMin,
    seconds: nextS,
    milliseconds: nextMs,
  }

  if (tickMs) {
    if (tickS) {
      if (tickM) {
        return newTimeH
      }
      return newTimeM
    }
    return newTimeS
  }
  return newTimeMs
}

export const Timer: FC<{ startTime?: Date }> = ({
  startTime = new Date('Tue Aug 04 1992 10:58:00 GMT+0000'),
}) => {
  const memo = useMemo(() => {
    const start = startTime.getTime()
    const now = new Date().getTime()
    const isFuture = start > now
    const [left, right] = isFuture ? [start, now] : [now, start]
    let delta = left - right
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

  useEffect(() => {
    const { days, hours, minutes, seconds, milliseconds } = memo
    const isFuture = startTime.getTime() > new Date().getTime()
    setTime({
      hours: days * 24 + hours,
      minutes,
      seconds,
      milliseconds,
    })
    const interval = setInterval(() => {
      setTime(timeUpdate(isFuture))
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
