import TopUpProps from "~/interface/balance/topUp"
import axios from "~/lib/axios"
import { topUpApi } from "~/utils/api"

const topUp = (formData: TopUpProps) => {
    return axios.post(`${topUpApi}`, formData)
}

const PaymentService = {
    topUp
}

export default PaymentService