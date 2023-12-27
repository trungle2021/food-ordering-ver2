import React from 'react'
import styles from './AddressSection.module.css'
import {Button} from '../../../UI/Button/Button'
import { Location } from '../../../UI/Icon/Icon'

export const AddressSection = () => {
  return (
    <div className={styles['address__container']}>
        <h3>Your Address</h3>
        <div  className={styles['address__info']}>
            <Location/>
            <span>Elm Street, 23</span>
            <Button>Change</Button>
        </div>
        <input type="text" name="" id="" placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. sed do eiusmod tempor incididunt. sed do eiusmod tempor incididunt. ' />
        <Button>Add Note</Button>
    </div>
  )
}
