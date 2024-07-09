import TopUpProps from "~/interface/balance/topUp"
import axios from "~/lib/axios"
import { topUpApi } from "~/utils/api"

const topUp = (data: TopUpProps) => {
    return axios.post(`${topUpApi}`, data)
}

const PaymentService = {
    topUp
}

export default PaymentService