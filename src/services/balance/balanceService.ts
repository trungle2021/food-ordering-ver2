import axios from '~/lib/axios'
import { getBalanceApi } from '~/utils/api';

const getBalanceByUserId = async (userId: string) => {
    return await axios.get(`${getBalanceApi}/users/${userId}`);
}

const BalanceService = {
    getBalanceByUserId
}

export default BalanceService
