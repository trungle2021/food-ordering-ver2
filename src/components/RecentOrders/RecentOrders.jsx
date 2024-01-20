import React, { useEffect, useState, useContext } from "react";
import RecentOrder from './RecentOrder'
import { AuthContext } from '../../store/AuthContext';
import { getRecentOrdersApi } from '../../utils/api';
import axios from "axios";


export const RecentOrders = () => {
  const userid = useContext(AuthContext);
  const getRecentOrdersApiAddedUserId = getRecentOrdersApi.replace('USERID', userid)

  const [recentOrders, setRecentOrders] = useState([])
  const getRecentOrders = async () => {
    try {
      const response = await axios.get(`${getRecentOrdersApiAddedUserId}?limit=2`)
      setRecentOrders(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    getRecentOrders()
  }, [])


  const recentOrdersItem = recentOrders.map(order => {
    return <RecentOrder
      key={order._id}
      image={order.image}
      name={order.name}
      price={order.price}
      isFavorite={true}
    />
  })
  return (
    <div>{recentOrdersItem}</div>
  )
}


