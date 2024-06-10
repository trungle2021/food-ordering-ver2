import { HeaderPage } from "~/components/HeaderPage";
import { SearchBar } from "~/components/SearchBar";
import styles from './styles.module.css'
import { TableContainer, Table as MuiTable, TableHead, TableRow, TableCell, TableBody, TableFooter, TablePagination } from '@mui/material'
import { useState } from "react";
import { Container } from "@mui/system";

const data = [
    {
        "order_details": [
            {
                "_id": "658400cd4226d923d45633cc",
                "created_at": "2023-12-21T09:07:09.960Z",
                "order": "658400cd4226d923d45633ca",
                "dish": {
                    "_id": "65742b8e7c4e4913081c718c",
                    "name": "Mac & Cheese",
                    "image": "http://localhost:1337/images/mac-and-cheese.jpg"
                },
                "quantity": 2,
                "price": 8.99,
                "__v": 0
            },
            {
                "_id": "658400cd4226d923d45633cd",
                "created_at": "2023-12-21T09:07:09.960Z",
                "order": "658400cd4226d923d45633ca",
                "dish": {
                    "_id": "65742b8e7c4e4913081c718d",
                    "name": "Margherita Pizza",
                    "image": "http://localhost:1337/images/margherita-pizza.jpg"
                },
                "quantity": 1,
                "price": 12.99,
                "__v": 0
            }
        ],
        "order_total": 30.97,
        "order_status": "completed",
        "payment_status": "paid",
        "payment_method": null,
        "cancel_reason": null,
        "time_completed": null,
        "created_at": "2023-12-21T09:07:09.956Z",
        "updated_at": null,
        "_id": "658400cd4226d923d45633ca",
        "user": "65741dbdc65e820e07b382bf",
        "order_date": "2023-12-10T00:00:00.000Z",
        "shipping_address": "123 Main St, Exampleville, CA"
    },
    {
        "order_details": [
            {
                "_id": "6584010c4226d923d45633d6",
                "created_at": "2023-12-21T09:07:09.960Z",
                "order": "6584010c4226d923d45633d4",
                "dish": {
                    "_id": "65742b8e7c4e4913081c719c",
                    "name": "Mushroom Risotto",
                    "image": "http://localhost:1337/images/mushroom-risotto.jpg"
                },
                "quantity": 2,
                "price": 8.99,
                "__v": 0
            },
            {
                "_id": "6584010c4226d923d45633d7",
                "created_at": "2023-12-21T09:07:09.960Z",
                "order": "6584010c4226d923d45633d4",
                "dish": {
                    "_id": "65742b8e7c4e4913081c7199",
                    "name": "Beef Tacos",
                    "image": "http://localhost:1337/images/beef-tacos.jpg"
                },
                "quantity": 1,
                "price": 12.99,
                "__v": 0
            },
            {
                "_id": "6584010c4226d923d45633d8",
                "created_at": "2023-12-21T09:07:09.960Z",
                "order": "6584010c4226d923d45633d4",
                "dish": {
                    "_id": "65742b8e7c4e4913081c7195",
                    "name": "Vegan Buddha Bowl",
                    "image": "http://localhost:1337/images/vegan-buddha-bowl.jpg"
                },
                "quantity": 4,
                "price": 2.99,
                "__v": 0
            }
        ],
        "order_total": 42.93,
        "order_status": "completed",
        "payment_status": "paid",
        "payment_method": null,
        "cancel_reason": null,
        "time_completed": null,
        "created_at": "2023-12-21T09:07:09.956Z",
        "updated_at": null,
        "_id": "6584010c4226d923d45633d4",
        "user": "65741dbdc65e820e07b382bf",
        "order_date": "2023-12-10T00:00:00.000Z",
        "shipping_address": "123 Main St, Exampleville, CA"
    },
    {
        "order_details": [
            {
                "_id": "6584011e4226d923d45633dd",
                "created_at": "2023-12-21T09:07:09.960Z",
                "order": "6584011e4226d923d45633db",
                "dish": {
                    "_id": "65742b8e7c4e4913081c7190",
                    "name": "Veggie Burger",
                    "image": "http://localhost:1337/images/veggie-burger.jpg"
                },
                "quantity": 2,
                "price": 8.99,
                "__v": 0
            },
            {
                "_id": "6584011e4226d923d45633df",
                "created_at": "2023-12-21T09:07:09.960Z",
                "order": "6584011e4226d923d45633db",
                "dish": {
                    "_id": "65742b8e7c4e4913081c7195",
                    "name": "Vegan Buddha Bowl",
                    "image": "http://localhost:1337/images/vegan-buddha-bowl.jpg"
                },
                "quantity": 4,
                "price": 2.99,
                "__v": 0
            }
        ],
        "order_total": 29.94,
        "order_status": "completed",
        "payment_status": "paid",
        "payment_method": null,
        "cancel_reason": null,
        "time_completed": null,
        "created_at": "2023-12-21T09:07:09.956Z",
        "updated_at": null,
        "_id": "6584011e4226d923d45633db",
        "user": "65741dbdc65e820e07b382bf",
        "order_date": "2023-12-10T00:00:00.000Z",
        "shipping_address": "123 Main St, Exampleville, CA"
    }
]
export const OrderHistory = () => {
    const handleSubmitSearchForm = () => {
        console.log("Search form submitted");
    }

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);



    return <>
        <HeaderPage pageName="Order History" />
        {/* <SearchBar onSubmitSearchForm={handleSubmitSearchForm} /> */}
        <Container maxWidth='xl'>
            {data.map(order => (
                <div className={styles['order-container']}>
                    <div className={styles['order-container__header']}>
                        <div>Order Date: {order.order_date}</div>
                        <div>Order Status: {order.order_status}</div>
                    </div>

                    <div className={styles['order-container__body']}>
                        {order.order_details.map(orderDetail => (
                            <div className={styles['order-item']}>
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
                            <button className={styles["order__actions--review-button"]}>Đánh Giá</button>
                            <button className={styles["order__actions--reorder-button"]}>Order Again</button>
                        </div>
                    </div>
                </div>
            ))}
        </Container>
    </>
};




{/* <TableContainer>
<MuiTable sx={{ tableLayout: 'fixed', width: '100%' }}>
    <TableHead>
        <TableRow>
            <TableCell>Order Number</TableCell>
            <TableCell>Total Charge</TableCell>
            <TableCell>Placed On</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Status</TableCell>
        </TableRow>
    </TableHead>
    <TableBody>
        {data.map((row, index) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

            </TableRow>
        ))}
    </TableBody>
    <TableFooter>
        <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </TableFooter>
</MuiTable>
</TableContainer> */}