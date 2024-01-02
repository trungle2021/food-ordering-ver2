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
        <OrderDiscussion size={25} />
        <Notification size={25} />
        <SettingBlack size={25} />
      </div>
      <Avatar className={styles['user__avatar']} size={25} />
    </div>
  )
}
