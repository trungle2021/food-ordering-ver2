import { HeaderPage } from "~/components/HeaderPage";
import { SearchBar } from "~/components/UI/SearchBar";
import styles from './styles.module.css'
import { TableContainer, Table as MuiTable, TableHead, TableRow, TableCell, TableBody, TableFooter, TablePagination } from '@mui/material'
import { useState } from "react";

const data = [
    {
        "order_details": [
            "658400cd4226d923d45633cc",
            "658400cd4226d923d45633cd"
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
            "6584010c4226d923d45633d6",
            "6584010c4226d923d45633d7",
            "6584010c4226d923d45633d8"
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
            "6584011e4226d923d45633dd",
            "6584011e4226d923d45633df"
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

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return <>
        <HeaderPage pageName="Order History" />
        <SearchBar onSubmitSearchForm={handleSubmitSearchForm} />
        <TableContainer>
            <MuiTable>
                <TableHead>
                    <TableRow>
                        <TableCell>Menu</TableCell>
                        <TableCell>Date</TableCell>
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
        </TableContainer>
    </>
};


{/* <div className={styles['order-container']}>
<div className={styles['order-item']}>
    <div className={styles['order-item-info']}>
        <img className={styles['order-item-image']} src="https://down-vn.img.susercontent.com/file/7f027b94b0bd72744310657db00b2653_tn" alt="product" />
        <div className={styles['order-item-details']}>
            <h3>Dầu gội thảo dược CÔ BÍ</h3>
            <p>Phân loại hàng: 500ml</p>
        </div>
    </div>
    <span className="price">₫298.900</span>
</div>
<div className={styles['item-actions']}>
    <button className="review-button">Đánh Giá</button>
    <button className="other-button">Yêu Cầu Trả Hàng/Hoàn Tiền</button>
    <button className="other-button">Thêm</button>
</div>
</div> */}