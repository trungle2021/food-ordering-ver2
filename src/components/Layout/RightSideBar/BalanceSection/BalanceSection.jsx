import React from 'react'
import styles from './BalanceSection.module.css'
import { TopUp, Transfer } from '../../../UI/Icon/Icon'
export const BalanceSection = ({ className }) => {
    return (
        <div className={`${styles['balance__container']} `}>
            <h3 className='title-section'>Your Balance</h3>
            <img className={styles['balance__background-image']} src='/CardBalanceBackground.png' />
            <div className={styles['balance__content']}>
                <div className={styles['balance__info']}>
                    <p className={styles['balance__info-title']}>Balance</p>
                    <span className={styles['balance__info-amount']}>$12.000</span>
                </div>
                <div className={styles['balance__function']}>
                    <div className={styles['balance__function__item']}>
                        <TopUp className={styles['balance__function-button']} size={50} />
                        <span>Top Up</span>
                    </div>
                    <div className={styles['balance__function__item']}>
                        <Transfer className={styles['balance__function-button']} size={50} />
                        <span>Transfer</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
