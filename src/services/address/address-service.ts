import axios from '~/lib/axios'



const addAddress = async(formData: AddAddressFormValues) => {
        const response = await axios.post('/address', formData)
        return response.data
}

const AddressService = {
    addAddress
}

export default AddressService