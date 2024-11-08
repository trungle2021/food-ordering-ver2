import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addItem, updateItem, getCart } from "~/store/cart/cartAction";
import { RootState } from "~/store/store";

interface Dish {
  _id: string;
  name: string;
  price: number;
  // Add other dish properties as needed
}

interface CartItem {
  dish: Dish;
  quantity: number;
}

interface Cart {
  items: CartItem[];
  totalItems: number;
}

interface AddItemPayload {
  userId: string;
  dishId: string;
  quantity: number;
}

interface UpdateItemPayload {
  userId: string;
  dishId: string;
  updateQuantity: number;
}

export function useCart() {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user?.user?._id);
  const cart = useSelector((state: RootState) => state.cart as Cart);

  const fetchCart = async () => {
    try {
      dispatch<any>(getCart(userId as string))
    } catch (error) {
      toast.error('Failed to fetch cart');
      throw error;
    }
  };

  const addItemToCart = async (dishId: string) => {
    if (!userId) {
      toast.error('Please login to add items to cart');
      return;
    }

    try {
      const itemExistsInCart = cart.items.find(
        (item) => item.dish._id === dishId
      );

      if (itemExistsInCart) {
        const payload: UpdateItemPayload = {
          userId,
          dishId: itemExistsInCart.dish._id,
          updateQuantity: itemExistsInCart.quantity + 1
        };

        await dispatch<any>(updateItem(payload))
          .then(unwrapResult);
      } else {
        const payload: AddItemPayload = {
          userId,
          dishId,
          quantity: 1,
        };

        await dispatch<any>(addItem(payload))
          .then(unwrapResult);
        toast.success('Item has been added to the cart.');
      }
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    }
  };

  return {
    cart,
    addItemToCart,
    fetchCart,
    isLoading: !cart, // Basic loading state
  };
} 