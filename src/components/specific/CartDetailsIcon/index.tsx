import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CartIcon } from '~/components/common/UI/Icon';
import styles from './styles.module.css';
import { getCart } from '~/store/cart/cartAction'; // Assuming you have a cartSlice

export const CartDetailsIcon = () => {
	const dispatch = useDispatch();
	const cart = useSelector((state: any) => state.cart);
	const userId = useSelector((state: any) => state.user?.user?._id);

	useEffect(() => {
		const fetchCart = async () => {
			if (userId && !cart.isFetched) {
				try {
					dispatch<any>(getCart(userId));
				} catch (error) {
					console.error('Error fetching cart:', error);
				}
			}
		};

		fetchCart();
	}, [userId, cart.isFetched, dispatch]);

	return (
		<div className={styles['cart-icon-container']}>
			<CartIcon />
			{cart.totalItems > 0 && <span className={styles['badge']}>{cart.totalItems}</span>}
		</div>
	);
};
