import { CartIcon } from '~/components/common/UI/Icon'
import styles from './styles.module.css'
import { useSelector } from 'react-redux'

export const CartDetailsIcon = () => {
    const cart = useSelector((state:any) => state.cart)
    console.log(cart);
  return (
    <div className={styles['cart-icon-container']}>
        <CartIcon />
        {cart.totalItems > 0 && <span className={styles['badge']}>{cart.totalItems}</span>}
        <div className={styles['cart-details-container']}>
            <span>Cart</span>
            <ul>
                {cart.items.map((item:any) => (
                  <li key={item._id}>
                      <span>{item.dish.name}</span>
                      </li>
                ))}
            </ul>
            <span>{cart.totalItems} items</span>
        </div>
    </div>
  )
}
