import React from 'react'
import styles from './Login.module.css'
import { LoginForm } from './LoginForm'

export const Login = () => {
  return (
        <div className={`${styles['login-container']}`}>
            <div className={`${styles['login-left']}`}>
                <img className={`${styles['login-left-image']}`} src="/login-page-background.jpg" alt="" />
            </div>
            <div className={`${styles['login-right']}`}>
              <LoginForm/>
            </div>
        </div>
  )
}
