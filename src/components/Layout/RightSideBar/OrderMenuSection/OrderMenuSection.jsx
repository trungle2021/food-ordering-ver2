import React from 'react'
import styles from './OrderMenuSection.module.css'
import { OrderItem } from '../../../UI/OrderItem/OrderItem'

export const OrderMenuSection = ({ className }) => {
    const orderItems = [
        { id: '1', name: 'A', url: '3.vn' },
        { id: '2', name: 'B', url: '3.vn' },
        { id: '3', name: 'C', url: '3.vn' },
    ]

    const orderItemList = orderItems.map(item => {
        return (
            <li key={item.id}>
                <OrderItem item={item} />
            </li>
        )
    })

    return (
        <div className={`${styles['orderMenu__container']}`}>
            <h3 className={`${styles['orderMenu__container-title']} title-section`}>Order Menu</h3>
            <ul className={`${styles['orderMenu__container-list']}`}>
                {orderItemList}
            </ul>
            <hr style={{ border: 'none', height: '1px', backgroundColor: '#c8c8c8', marginTop: '50px' }} />
            <div>
                <div className={`${styles['service__container']}`}>
                    <span>Service</span>
                    <span>+$1.00</span>
                </div>
                <div className={`${styles['total__container']}`}>
                    <span className={`${styles['total-title']}`}>Total</span>
                    <span className={`${styles['total-amount']}`}>$202.00</span>
                </div>
            </div>

            <div>
                <Button>Have a coupon code ?</Button>
                <Button>Checkout</Button>
            </div>
        </div>
    )
}
