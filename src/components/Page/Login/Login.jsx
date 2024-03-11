import React from 'react'
import styles from './Login.module.css'

export const Login = () => {
  return (
        <div className={`${styles['login-container']}`}>
            <div>
                <img src="/login-page-background.jpg" alt="" />
            </div>
            <div>Login Content</div>
        </div>
  )
}
