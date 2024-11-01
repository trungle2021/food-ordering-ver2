import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.css';
import { useCheckout } from '~/hooks/useCheckout';

interface CartItem {
  _id: string;
  dish: {
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
}

export const Cart: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const { handleCheckoutAction } = useCheckout()


  const calculateTotal = () => {
    return cart.items.reduce((total, item) => total + item.dish.price * item.quantity, 0);
  };

  return (
    <div className={styles['container']}>
      <h1 className={styles['title']}>Your Cart</h1>
      {cart.items.length === 0 ? (
        <p className={styles['empty-cart']}>Your cart is empty.</p>
      ) : (
        <>
          <ul className={styles['cart-list']}>
            {cart.items.map((item: CartItem) => (
              <li key={item._id} className={styles['cart-item']}>
                <img 
                  src={item.dish.image} 
                  alt={item.dish.name} 
                  className={styles['item-image']}
                />
                <div className={styles['item-details']}>
                  <h3>{item.dish.name}</h3>
                  <p>Price: ${item.dish.price.toFixed(2)}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <div className={styles['item-total']}>
                  ${(item.dish.price * item.quantity).toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
          <div className={styles['cart-summary']}>
            <p className={styles['total-items']}>Total Items: {cart.totalItems}</p>
            <p className={styles['total-price']}>Total Price: ${calculateTotal().toFixed(2)}</p>
            <button className={styles['checkout-button']} onClick={handleCheckoutAction}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};
