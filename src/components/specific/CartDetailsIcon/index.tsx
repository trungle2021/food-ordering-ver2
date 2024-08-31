import { CartIcon } from '~/components/common/UI/Icon'
import styles from './styles.module.css'
import { useSelector } from 'react-redux'

export const CartDetailsIcon = () => {
    const cart = useSelector((state:any) => state.cart)
  return (
    <div className={styles['cart-icon-container']}>
        <CartIcon />
        {cart.totalItems > 0 && <span className={styles['badge']}>{cart.totalItems}</span>}
    </div>
  )
}
