import axios from '~/lib/axios'
import { baseUserAddressApi } from '~/utils/api'



const addAddress = async(formData: AddAddressFormValues) => {
        const response = await axios.post(`${baseUserAddressApi}`, formData)
        return response.data
}

const AddressService = {
    addAddress
}

export default AddressService