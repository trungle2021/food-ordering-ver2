import styles from './styles.module.css'

export const CartItem = ({ item }:{ item : any}) => {
    return (
        <div className={`${styles['order-item-container']}`}>
            <img src={item.url} />
            <div className={`${styles['dish-container']}`}>
                <span className={`${styles['dish-name']}`}>{item.name}</span>
                <span className={`${styles['dish-quantity']}`}>x{item.quantity}</span>
            </div>
            <span className={`${styles['dish-price']}`}>+${item.price}</span>
        </div>
    )
}
