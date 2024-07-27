import styles from './styles.module.css'
import CartItemProps from '~/interface/cart/CartItem';
import { useModifyQuantityCartItem } from '~/hooks/useModifyQuantityCartItem';


export const CartItem = ({item, imageSize}: {item : CartItemProps, imageSize: string}) => {
    const {
        quantity,
        amount,
        disabled,
        handleQuantityChange,
        submitQuantityChange,
        handleClickModifyQuantity
    } = useModifyQuantityCartItem(item)

    const imageClass = imageSize === 'small' ? 'image--small' : 'image--normal';

    return (
        <div className={`${styles['cart-item-container']}`}>
            <img className={`${styles['image']} ${styles[imageClass]}`} src={item.dish.image} />
            <div className={`${styles['dish-container']}`}>
                <span className={`${styles['dish-name']}`}>{item.dish.name}</span>
                <div>
                    <span>x</span>
                    <input type='text' className={`${styles['dish-quantity']}`} onChange={handleQuantityChange} onBlur={submitQuantityChange} value={quantity}/>
                </div>
            </div>
            <div className={`${styles['action-button']}`}>
                <button className={`${styles['modify-quantity-btn']}`}  onClick={()=>handleClickModifyQuantity(item.dish._id,'decrement')}>-</button>
                <button className={`${styles['modify-quantity-btn']}`} disabled={disabled} onClick={()=>handleClickModifyQuantity(item.dish._id,'increment')}>+</button>
            </div>
            
            <span className={`${styles['dish-price']}`}>+ <span className='dollar'>$</span> {amount} </span>
        </div>
    )
}
