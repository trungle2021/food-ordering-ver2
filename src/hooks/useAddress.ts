import { toast } from 'react-toastify'
import UserAddress from '~/interface/user/userAddress'
import OrderService from '~/services/order/orderSerivce'
import UserService from '~/services/user/userService'

interface UseAddressProps {
    checkoutSessionId?: string
    user: any
    onAddressChange: (address: UserAddress | null) => void
    onUserAddressModalChange: (open: boolean) => void
    onCreateAddressModalChange: (open: boolean) => void
}

export function useAddress({
    checkoutSessionId,
    user,
    onAddressChange,
    onUserAddressModalChange,
    onCreateAddressModalChange
}: UseAddressProps) {
    const getAddress = (sessionData: any) => {
        const address = JSON.parse(sessionData.shipping_address)
        return address
    }

    const getDefaultAddress = () => {
        return user?.user.user_address?.find((address: UserAddress) => address.is_default_address) || null
        
    }

    const handleOpenUserAddress = () => onUserAddressModalChange(true)
    const handleCloseUserAddressModal = () => onUserAddressModalChange(false)
    const handleOpenCreateAddress = () => onCreateAddressModalChange(true)
    const handleCloseCreateAddressModal = () => onCreateAddressModalChange(false)

    const handleShippingAddressChange = async (payload: any) => {
        try {
            if (checkoutSessionId) {
                const response = await OrderService.updateCheckoutSession(checkoutSessionId, payload)
                if (response.status === 'success' && response.data) {
                    const newAddress = user?.user?.user_address.find((address: any) => 
                        address._id === payload.addressId
                    )
                    onAddressChange(newAddress)
                    onUserAddressModalChange(false)
                    toast.success('Update order successfully')
                } else {
                    toast.error('Update order failed')
                }
            } else {
                const response = await UserService.updateAddress(user?.user?._id, payload)
                if (response.status === 200) {
                    const newAddress = user?.user_address.find((address: any) => 
                        address._id === payload.addressId
                    )
                    onAddressChange(newAddress)
                    onUserAddressModalChange(false)
                    toast.success('Updated default address successfully')
                } else {
                    toast.error('Failed to update default address')
                }
            }
        } catch (error) {
            console.error("Failed to update:", error)
            toast.error(checkoutSessionId ? 'Failed to update order' : 'Failed to update default address')
        }
    }

    return {
        getAddress,
        getDefaultAddress,
        handleOpenUserAddress,
        handleCloseUserAddressModal,
        handleOpenCreateAddress,
        handleCloseCreateAddressModal,
        handleShippingAddressChange
    }
}