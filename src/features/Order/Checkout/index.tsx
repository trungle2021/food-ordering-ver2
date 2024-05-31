import { useSelector } from "react-redux"
import { HeaderPage } from "~/components/HeaderPage"
import styles from './styles.module.css'
import { CartItem } from "~/components/UI/CartItem"

export const Checkout = () => {
  const cart = useSelector((state:any) => state.cart)
  
  return (
    <>
      <HeaderPage pageName="Order"/>
      <div className={styles['checkout-container']}>
          <h1>Order Details</h1>
          <div>
            <div className={styles['checkout-container__delivery-address']}>

            </div>
            <div className={styles['checkout-container__order-details']}>
              <div>
                
              </div>
              <div>

              </div>
              <hr />
              <span>Total</span>
            </div>
          </div>
      </div>
    </>
  )
}
