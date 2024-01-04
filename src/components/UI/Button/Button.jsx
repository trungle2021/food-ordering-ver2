import React from 'react'
export const Button = ({ children, className }) => {

  return (
    <button className={`rounded-8 ${className}`}>{children}</button>
  )
}
