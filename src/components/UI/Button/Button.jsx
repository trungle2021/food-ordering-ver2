import React from 'react'
import styled from 'styled-components'
export const Button = ({ children, className }) => {
  const ButtonStyled = styled.button`
    border-radius : 30px;
  `
  return (
    <ButtonStyled className={className}>{children}</ButtonStyled>
  )
}
