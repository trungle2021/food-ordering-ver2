import TopUpProps from "~/interface/balance/topUp"
import axios from "~/lib/axios"
import { topUpApi } from "~/utils/api"

const topUp = (payload: TopUpProps) => {
    return axios.post(`${topUpApi}`, payload)
}

const PaymentService = {
    topUp
}

export default PaymentService