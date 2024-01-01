import React from 'react'
import styles from './AddressSection.module.css'
import { Button } from '../../../UI/Button/Button'
import { Location } from '../../../UI/Icon/Icon'

export const AddressSection = () => {
  return (
    <div className={styles['address__container']}>
      <h3 className={styles['address-title']}>Your Address</h3>
      <div className={styles['address__info']}>
        <div className={styles['address__info-location']}>
          <Location className={`${styles['address__info-location-icon']}`} size={30} />
          <span className={` ${styles['address__info-location-text']}`}>Elm Street, 23</span>
        </div>
        <Button className={` ${styles['address-button']}`}>Change</Button>
      </div>
      <input className={styles['address__info-note']} type="text" name="" id="" placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. sed do eiusmod tempor incididunt. sed do eiusmod tempor incididunt. ' />
      <div className={styles['address__action']}>
        <Button className={`${styles['address-button']}`}>Add Details</Button>
        <Button className={`${styles['address-button']}`}>Add Note</Button>
      </div>
    </div>
  )
}


