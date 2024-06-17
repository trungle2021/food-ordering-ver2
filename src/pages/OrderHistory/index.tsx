import { HeaderPage } from "~/components/HeaderPage";
import styles from './styles.module.css'
import { Box, Container } from "@mui/system";
import { convertUtcToLocal } from "~/utils/convertUTCToLocalTimeZone";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { getOrderHistory } from "~/features/Order/orderAction";
import { DateRangePicker, Dropdown } from 'rsuite';
import { SearchBar } from "~/components/SearchBar";
import { SearchBarReactSuite } from "~/components/SearchBar/SearchBarReactSuite";

export const OrderHistory = () => {

    const dispatch = useDispatch()
    const orderState = useSelector((state: any) => state.order)
    const [category, setCategory] = useState('Category')
    const [orderStatus, setOrderStatus] = useState('Order Status')
    useEffect(() => {
        dispatch<any>(getOrderHistory({ page: 1, limit: 10 }))
    }, [dispatch])

    const orderHistory = orderState.orders
    const totalPages = orderState.totalPages



    const handlePageChange = (event: any, newPageChange: number) => {
        dispatch<any>(getOrderHistory({ page: newPageChange, limit: 10 }))
    }

    const handleCategoryChange = (eventKey: string | null, event: React.SyntheticEvent<unknown>) => {
        console.log('Selected eventKey:', eventKey);
        const content = (event.target as HTMLElement).innerText;
        setCategory(content || "")
        // Implement your logic here based on the selected eventKey
    };

    const handleOrderStatusChange = (eventKey: string | null, event: React.SyntheticEvent<unknown>) => {
        console.log('Selected eventKey:', eventKey);
        const content = (event.target as HTMLElement).innerText;
        setOrderStatus(content || "")
        // Implement your logic here based on the selected eventKey
    };

    // const handleSubmitSearchForm = () => {

    // }

    return <>
        <HeaderPage pageName="Order History" />
        {/* <SearchBar onSubmitSearchForm={handleSubmitSearchForm} /> */}
        <Container maxWidth='xl'>
            <Box sx={{ display: 'flex', gap: '20px' }}>
                <DateRangePicker />
                <Dropdown title={category} trigger='hover' onSelect={handleCategoryChange}>
                    <Dropdown.Item eventKey="new-file">New File</Dropdown.Item>
                    <Dropdown.Item eventKey="new-file-current-profile">New File with Current Profile</Dropdown.Item>
                    <Dropdown.Item eventKey="download-as">Download As...</Dropdown.Item>
                    <Dropdown.Item eventKey="export-pdf">Export PDF</Dropdown.Item>
                    <Dropdown.Item eventKey="export-html">Export HTML</Dropdown.Item>
                    <Dropdown.Item eventKey="settings">Settings</Dropdown.Item>
                    <Dropdown.Item eventKey="about">About</Dropdown.Item>
                </Dropdown>

                <Dropdown title={orderStatus} trigger='hover' onSelect={handleOrderStatusChange}>
                    <Dropdown.Item eventKey="completed">Completed</Dropdown.Item>
                    <Dropdown.Item eventKey="pending">Pending</Dropdown.Item>
                    <Dropdown.Item eventKey="canceled">Canceled</Dropdown.Item>
                </Dropdown>

                <SearchBarReactSuite style={{width: '500px', marginLeft: 'auto'}} size="md" placeholder="Search by dish name"/>
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
