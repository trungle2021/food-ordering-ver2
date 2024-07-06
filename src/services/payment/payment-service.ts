import axios from "~/lib/axios"
import { topUpApi } from "~/utils/api"

const topUp = (amount: number) => {
    return axios.post(`${topUpApi}`, {amount})
}

const PaymentService = {
    topUp
}

export default PaymentService