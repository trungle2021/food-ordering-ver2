import axios from '~/lib/axios'
import { getBalanceApi } from '~/utils/api';

const getBalance = async () => {
    return await axios.get(`${getBalanceApi}`);
}

const BalanceService = {
    getBalance
}

export default BalanceService
