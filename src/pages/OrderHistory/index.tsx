import styles from './styles.module.css'
import { Box, Container } from "@mui/system";
import { convertUtcToLocal } from "~/utils/convertUTCToLocalTimeZone";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { DateRange } from "rsuite/esm/DateRangePicker/types";
import { useQuery } from "~/hooks/useQuery";
import { useHistory } from "react-router-dom";
import { DateRangePicker, Dropdown } from "rsuite";
import { debounce } from "~/utils/debounce";
import { getOrderHistory } from '~/store/order/orderAction';
import { SearchBarReactSuite } from '~/components/common/SearchBar/SearchBarReactSuite';
import { HeaderPage } from '~/components/specific/HeaderPage';




export const OrderHistory = () => {

    let content = null
    const queryParams = useQuery()
    const history = useHistory()
    const user = useSelector((state: any) => state.user.user)
    const userId = user._id
    const dispatch = useDispatch()
    const orderState = useSelector((state: any) => state.order)
    const [search, setSearch] = useState('')
    const [dateRange, setDateRange] = useState<any>(() => {
        if (queryParams.has('order_date[gte]') && queryParams.has('order_date[lte]')) {
            const startDate = new Date(queryParams.get('order_date[gte]') as string)
            const endDate = new Date(queryParams.get('order_date[lte]') as string)
            return [startDate, endDate]
        }
        return []
    })
    const [filter, setFilter] = useState(queryParams.toString())
    const [orderStatus, setOrderStatus] = useState('Order Status')

    const orderHistory = orderState.orderHistories
    const isLoading = orderState.isLoading
    const error = orderState.error
    const totalPage = orderState.totalPage


    useEffect(() => {
       if(userId) dispatch<any>(getOrderHistory({userId, filter, page: 1, limit: 10 }))
    }, [userId,dispatch])

    const handlePageChange = (event: any, newPageChange: number) => {
        if(userId) dispatch<any>(getOrderHistory({userId, filter, page: newPageChange, limit: 10 }))
    }

    const updateAndApplyFilter = (queryParams: URLSearchParams) => {
        const updatedFilter = queryParams.toString();
        setFilter(updatedFilter);
        history.push({ search: updatedFilter });
        if (userId) dispatch<any>(getOrderHistory({ userId, filter: updatedFilter, page: 1, limit: 10 }));
    }

    const handleDateRangeChange = (range: DateRange | null) => {
        if (range) {
            const dateRange = [range[0], range[1]]
            const startDate = range[0]
            const endDate = range[1];
            endDate.setHours(23, 59, 59, 999);

            setDateRange(dateRange)

            queryParams.set('order_date[gte]', startDate.toISOString());
            queryParams.set('order_date[lte]', endDate.toISOString());

            updateAndApplyFilter(queryParams)
        }
    };

    const handleOrderStatusChange = (eventKey: string | null, event: React.SyntheticEvent<unknown>) => {
        const content = (event.target as HTMLElement).innerText;
        setOrderStatus(content || "")
        const queryParams = new URLSearchParams(filter);
        if (eventKey) {
            if (eventKey === 'all') {
                queryParams.delete('order_status'); // Remove the filter if eventKey is all
                updateAndApplyFilter(queryParams)
                return
            }
            queryParams.set('order_status', eventKey);
        } else {
            queryParams.delete('order_status'); // Remove the filter if eventKey is null or empty
        }
        updateAndApplyFilter(queryParams)
    };

    const handleClearDateRange = () => {
        setDateRange([])
        const queryParams = new URLSearchParams(filter);
        queryParams.delete('order_date[gte]');
        queryParams.delete('order_date[lte]');
        updateAndApplyFilter(queryParams)
    }


    const handleOnSubmitSearchDishByName = (dishName: string) => {
        if (dishName.trim() === search.trim()) {
            return
        }
        if (dishName.trim() === '') {
            const queryParams = new URLSearchParams(filter);
            queryParams.delete('dish_name')
            setSearch('')
            updateAndApplyFilter(queryParams)
            return
        }
        setSearch(dishName)
        queryParams.set('dish_name', dishName);
        updateAndApplyFilter(queryParams)
        return
    }

    const handleOnSubmitSearchDishByNameDebounced = debounce(handleOnSubmitSearchDishByName, 1000)

    const OrderHistoryFilter = <>
        <Box sx={{ display: 'flex', gap: '20px' }}>
            <DateRangePicker
                value={dateRange}
                onChange={handleDateRangeChange}
                onClean={handleClearDateRange}
            />

            <Dropdown title={orderStatus} trigger='hover' onSelect={handleOrderStatusChange}>
                <Dropdown.Item eventKey="all">All</Dropdown.Item>
                <Dropdown.Item eventKey="completed">Completed</Dropdown.Item>
                <Dropdown.Item eventKey="pending">Pending</Dropdown.Item>
                <Dropdown.Item eventKey="canceled">Canceled</Dropdown.Item>
            </Dropdown>

            <SearchBarReactSuite focusOnReload={true} value={search} onSubmit={dishName => handleOnSubmitSearchDishByNameDebounced(dishName)} style={{ width: '500px', marginLeft: 'auto' }} size="md" placeholder="Search by dish name" />
        </Box>
    </>

    if (isLoading) {
        content = <CircularProgress />
    }
    else if (error) {
        content = <div>
            Something went wrong
        </div>
    } else if (orderHistory.length === 0) {
        content = <div style={{ textAlign: 'center' }}>
            {OrderHistoryFilter}
            <p style={{ paddingTop: '40px' }}>No data found.</p>
        </div>
    } else {
        content = <>
            {OrderHistoryFilter}
            {orderHistory && orderHistory.map((order: any) => (
                <div className={styles['order-container']} key={order._id}>
                    <div className={styles['order-container__header']}>
                        <div>Order Date: {convertUtcToLocal(order.order_date).toLocaleDateString()}</div>
                        <div>Order Status: {order.order_status}</div>
                    </div>

                    <div className={styles['order-container__body']}>
                        {order.order_details.map((orderDetail: any) => (
                            <div className={styles['order-item']} key={orderDetail.dish._id}>
                                <div className={styles['order-item__info']}>
                                    <img className={styles['order-item--image']} src={orderDetail.dish.image} alt="product" />
                                    <div className={styles['order-item__details']}>
                                        <span className={styles['order-item__details--name']}>{orderDetail.dish.name}</span>
                                        <span>Quantity: x{orderDetail.quantity}</span>
                                        <span>Price: {orderDetail.price}</span>
                                    </div>
                                </div>
                                <span className={styles['order-item--price']}><span className="dollar">$</span>{orderDetail.price * orderDetail.quantity}</span>
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
                            <button type="button" className={styles["order__actions--review-button"]}>Review</button>
                            <button type="button" className={styles["order__actions--reorder-button"]}>Order Again</button>
                        </div>
                    </div>
                </div>
            ))}
            <Box display="flex" justifyContent="flex-end" paddingY={4}>
                <Pagination count={totalPage} color="primary" onChange={handlePageChange} />
            </Box>
        </>
    }

    return <>

        <HeaderPage pageName="Order History" />
        <Container maxWidth='xl'>
            {content}
        </Container>
    </>
};


