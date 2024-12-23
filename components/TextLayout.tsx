import React from 'react'
import c from 'classnames'
import { textStyle, baseStyle } from '../pages'
import classNames from 'classnames'

interface TextLayoutProps {
  theme: 'dark' | 'light'
  children: React.ReactNode
}

export const TextLayout = ({ theme, children }: TextLayoutProps) => {
  return (
    <div className="relative w-full h-full z-10 flex justify-center items-center">
      <span className={c(textStyle[theme], 'w-display')}>{children}</span>
    </div>
  )
}

export const LinkSection = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={c('flex justify-between font-sans uppercase mt-6', className)}
    >
      {children}
    </div>
  )
}

export const Title = ({
  heading,
  children,
}: {
  heading: string
  children: React.ReactNode
}) => {
  return (
    <div className="flex uppercase justify-between text-xl fill-white">
      <h1>{heading}</h1>
      {children}
    </div>
  )
}
const DEFAULT_CN = `flex justify-between h-spacer text-sm`
export const Subtitle = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <div className={classNames(DEFAULT_CN, className)}>
      <h2>{children}</h2>
    </div>
  )
}
