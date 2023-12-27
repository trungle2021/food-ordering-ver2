import React from 'react'
import {
    Avatar,
    Notification, OrderDiscussion, SettingBlack
} from '../../../UI/Icon/Icon'
import styles from './UserSection.module.css'

export const UserSection = () => {
  return (
    <div className={styles['user__container']}>
        <div className={styles['user__function']}>
            <OrderDiscussion size={35}/>
            <Notification size={35} /> 
            <SettingBlack size={35} /> 
        </div>
        <Avatar className={styles['user__avatar']} size={35}/>
    </div>
  )
}
