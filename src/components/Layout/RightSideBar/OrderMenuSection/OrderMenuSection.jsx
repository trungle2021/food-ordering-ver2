import React from 'react'
import styles from './OrderMenuSection.module.css'
import { OrderItem } from '../../../UI/OrderItem/OrderItem'

export const OrderMenuSection = () => {
    const orderItems = [
        { id: '1', name: 'A', url: '3.vn' },
        { id: '2', name: 'B', url: '3.vn' },
        { id: '3', name: 'C', url: '3.vn' },
    ]

    const orderItemList = orderItems.map(item => {
        return <OrderItem item={item} />
    })

    return (
        <div className={`${styles['order-menu-container']}`}>
            <h3 className={styles['order-menu-title']}>Order Menu</h3>
            <ul className={`${styles['order-menu-list']}`}>
                {orderItemList}
            </ul>
            <hr />
        </div>
    )
}
