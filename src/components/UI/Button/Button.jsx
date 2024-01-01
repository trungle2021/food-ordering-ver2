import React from 'react'
import styled from 'styled-components'
export const Button = ({ children, className }) => {

  return (
    <button className={`rounded-8 ${className}`}>{children}</button>
  )
}
