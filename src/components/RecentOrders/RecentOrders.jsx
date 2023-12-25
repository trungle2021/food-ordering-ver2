import React, { useEffect, useState, useContext } from "react";
import RecentOrder from './RecentOrder'
import { AppContext } from '../../store/AppContext';
import { getRecentOrdersApi } from '../../utils/api';
import axios from "axios";

const RecentOrders = () => {
  const { userId } = useContext(AppContext);
  console.log(userId)
  const getRecentOrdersApiAddedUserId = getRecentOrdersApi.replace('USERID', userId)

  const [recentOrders, setRecentOrders] = useState([])
  const getRecentOrders = async () => {
    try {
      const response = await axios.get(`${getRecentOrdersApiAddedUserId}?limit=3`)
      console.log(response.data.data)
      setRecentOrders(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    // getRecentOrders()
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
    <>
    </>
  )
}

export default RecentOrders