import { CartIcon } from '~/components/common/UI/Icon'
import styles from './styles.module.css'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useCart } from '~/hooks/useCart'
import { useEffect } from 'react'

export const CartDetailsIcon = () => {
    const { fetchCart } = useCart();
    const history = useHistory();
    const cart = useSelector((state: any) => state.cart);
    useEffect(() => {
      fetchCart();
    }, [])

  return (
    <div className={styles['cart-icon-container']}>
        <CartIcon />
        {cart.totalItems > 0 && <span className={styles['badge']}>{cart.totalItems}</span>}
        <div className={styles['cart-details-container']}>
            <span>Cart</span>
            <ul>
                {cart.items.map((item:any) => (
                  <li key={item._id}>
                     <div className={styles['cart-item']}>
                      <img src={item.dish.image} alt={item.dish.name} />
                      <div>
                        <span>{item.dish.name}</span>
                        <span>{item.dish.price}</span>
                      </div>
                     </div>
                  </li>
                ))}
            </ul>
            <span>{cart.totalItems} items</span>
           <button onClick={() => history.push('/cart')}>View Cart Detail</button>
        </div>
    </div>
  )
}
