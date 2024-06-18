import { HeaderPage } from "~/components/HeaderPage";
import styles from './styles.module.css'
import { Box, Container } from "@mui/system";
import { convertUtcToLocal } from "~/utils/convertUTCToLocalTimeZone";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { getOrderHistory } from "~/features/Order/orderAction";
import { Button, DateRangePicker, Dropdown } from 'rsuite';
import { SearchBarReactSuite } from "~/components/SearchBar/SearchBarReactSuite";
import { DateRange } from "rsuite/esm/DateRangePicker/types";

export const OrderHistory = () => {

    const dispatch = useDispatch()
    const orderState = useSelector((state: any) => state.order)
    const [filter, setFilter] = useState('')
    const [orderStatus, setOrderStatus] = useState('Order Status')

    useEffect(() => {
        dispatch<any>(getOrderHistory({ page: 1, limit: 10 }))
    }, [dispatch])

    const orderHistory = orderState.orders
    const totalPages = orderState.totalPages



    const handlePageChange = (event: any, newPageChange: number) => {
        dispatch<any>(getOrderHistory({ filter: orderStatus, page: newPageChange, limit: 10 }))
    }

    const handleDateRangeChange = (range: DateRange | null) => {
        if (range) {
            const startDate = range[0].toISOString()
            const endDate = range[1].toISOString()
            const updatedStartDateFilter = filter.replace(/(start_order_date=)[^&]*/, `start_order_date[gte]=${startDate}`)
            const updatedEndDateFilter = updatedStartDateFilter.replace(/(end_order_date=)[^&]*/, `end_order_date[lte}=${endDate}`)
            setFilter(updatedEndDateFilter)
            dispatch<any>(getOrderHistory({ filter: updatedEndDateFilter, page: 1, limit: 10 }))
        }
    };

    const handleOrderStatusChange = (eventKey: string | null, event: React.SyntheticEvent<unknown>) => {
        const content = (event.target as HTMLElement).innerText;
        setOrderStatus(content || "")
        //check if current filter has order_status
        const isOrderStatusExistOnFilter = filter.includes('order_status')
        if(isOrderStatusExistOnFilter){
            const newFilter = filter.replace(/(order_status=)[^&]*/, `order_status=${eventKey}`)
            setFilter(newFilter)
            dispatch<any>(getOrderHistory({ filter: newFilter, page: 1, limit: 10 }))
            return
        }else{
            const newFilter = filter.concat(`order_status=${eventKey}`)
            setFilter(newFilter)
            dispatch<any>(getOrderHistory({ filter: newFilter, page: 1, limit: 10 }))
        }
    };


    const handleSubmitSearchForm = () => {

    }

    return <>
        <HeaderPage pageName="Order History" />
        <Container maxWidth='xl'>
            <Box sx={{ display: 'flex', gap: '20px' }}>
                <DateRangePicker onChange={handleDateRangeChange} />

                <Dropdown title={orderStatus} trigger='hover' onSelect={handleOrderStatusChange}>
                    <Dropdown.Item eventKey="completed">Completed</Dropdown.Item>
                    <Dropdown.Item eventKey="pending">Pending</Dropdown.Item>
                    <Dropdown.Item eventKey="canceled">Canceled</Dropdown.Item>
                </Dropdown>

                <SearchBarReactSuite style={{ width: '500px', marginLeft: 'auto' }} size="md" placeholder="Search by dish name" />
            </Box>


            {orderHistory && orderHistory.map((order: any) => (
                <div className={styles['order-container']} key={order._id}>
                    <div className={styles['order-container__header']}>
                        <div>Order Date: {convertUtcToLocal(order.order_date).toLocaleDateString()}</div>
                        <div>Order Status: {order.order_status}</div>
                    </div>

                    <div className={styles['order-container__body']}>
                        {order.order_details.map((orderDetail: any) => (
                            <div className={styles['order-item']} key={orderDetail._id}>
                                <div className={styles['order-item__info']}>
                                    <img className={styles['order-item--image']} src={orderDetail.dish.image} alt="product" />
                                    <div className={styles['order-item__details']}>
                                        <span className={styles['order-item__details--name']}>{orderDetail.dish.name}</span>
                                        <span>Quantity: x{orderDetail.quantity}</span>
                                    </div>
                                </div>
                                <span className={styles['order-item--price']}><span className="dollar">$</span>{orderDetail.price}</span>
                            </div>
                        ))}
                    </div>

                    <div className={styles['order-container__footer']}>
                        <div className={styles['order-total']}>
                            <div>
                                <span>Total:</span>
                                <span><span className="dollar">$</span>{order.order_total}</span>
                            </div>
                        </div>
                        <div className={styles['order__actions']}>
                            <button className={styles["order__actions--review-button"]}>Review</button>
                            <button className={styles["order__actions--reorder-button"]}>Order Again</button>
                        </div>
                    </div>
                </div>
            ))}
            <Box display="flex" justifyContent="flex-end" paddingY={4}>
                <Pagination count={totalPages} color="primary" onChange={handlePageChange} />
            </Box>
        </Container>
    </>
};
