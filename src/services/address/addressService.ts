import axios from '~/lib/axios'
import { baseUserAddressApi } from '~/utils/api'



const addAddress = async(payload: AddressFormValues) => {
        const response = await axios.post(`${baseUserAddressApi}`, payload)
        return response.data
}

const updateAddress = async(payload: AddressFormValues) => {
    const response = await axios.put(`${baseUserAddressApi}`, payload)
    return response.data
}

const AddressService = {
    addAddress,
    updateAddress
}

export default AddressService