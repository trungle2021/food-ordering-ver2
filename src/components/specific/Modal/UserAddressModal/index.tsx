import { Breakpoint, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, List, ListItem, Radio, RadioGroup } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateAddressModal } from '../UpdateAddressModal';
import { AddressResponse } from '~/interface/user/addressResponse';
import { toast } from 'react-toastify';
import { CreateAddressModal } from '../CreateAddressModal';
import OrderService from '~/services/order/orderSerivce';

type UserAddressModalProps = {
    open: boolean,
    onOpen: () => void,
    onClose: () => void,
    onShippingAddressChange: (orderInfo: any) => void
    maxWidth?: false | Breakpoint | undefined;
}

const sortAddressListByDefaultAddress = (addressList: any) => {
    const cloneAddressList = [...addressList]
    return cloneAddressList.sort((a: any, b: any) => {
        if (a.is_default_address) {
            return -1
        }
        return 1
    })
}

export const UserAddressModal = ({ open, onClose, onOpen, onShippingAddressChange }: UserAddressModalProps) => {

    const dispatch = useDispatch()
    const user = useSelector((state: any) => state.user.user)
    const [openUpdateAddressModal, setOpenUpdateAddressModal] = useState(false)
    const [addressDetailUpdate, setAddressDetailUpdate] = useState<AddressResponse | null>(null);
    const [openCreateAddressModal, setOpenCreateAddressModal] = useState(false)
    const [radioChanged, setRadioChanged] = useState(false)
    const [radioAddressId, setRadioAddressId] = useState<string | null>(null)

    const userId = user?._id
    const addressList = user.user_address

    const [address, setAddress] = useState<AddressResponse | null>(() => {
        const sortedAddressList = sortAddressListByDefaultAddress(addressList)
        const defaultAddress = sortedAddressList[0]
        return defaultAddress
    });

    useEffect(() => {
        // This will set radioChanged to false every time the component mounts
        setRadioChanged(false);
    }, []);

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const addressId = (event.target as HTMLInputElement).value;
        setRadioChanged(true)
        setRadioAddressId(addressId)

    };



    const handleConfirmAddressChange = async (event: React.SyntheticEvent) => {

        if (radioChanged && radioAddressId) {
            const selectedAddress = addressList.find((address: AddressResponse) => address._id === radioAddressId);
            if (selectedAddress) {
                setAddress(selectedAddress);
            }
            // call API to set default address
            // const addressDetail = {
            //     addressId: radioAddressId,
            //     phone: selectedAddress.phone,
            //     address: selectedAddress.address,
            //     recipient: selectedAddress.recipient,
            //     is_default_address: true
            // }

            const orderInfo = {
                addressId: radioAddressId
            }
            try {
                const response = await OrderService.updateOrder(userId, orderInfo);
                if(response.status === 'success') {
                    const addressId = response?.data?._id
                    const orderInfo = {
                        addressId
                    }
                    onShippingAddressChange(orderInfo)
                    toast.success('Update order successfully')
                    onClose()
                }else{
                    toast.error('Update order failed')
                }
            } catch (error) {
                console.error("Failed to update order:", error);
            }
        }
        return

    }

    const handleSubmitCreateAddress = (address: AddressResponse) => {
        setAddress(address)
    }

    const handleCloseUpdateAddressModal = () => {
        onClose()
        setOpenUpdateAddressModal(false)
    }

    const handleCloseUserAddress = () => {
        //!  NEED TO RESET RADIO WHEN USER CLICK CANCEL   
        onClose()
    }

    const handleOpenUpdateAddressModal = (addressId: string) => {
        const selectedAddress = addressList.find((address: AddressResponse) => address._id === addressId);
        if (selectedAddress) {
            setAddressDetailUpdate(selectedAddress);
        }
        handleCloseUserAddress()
        setOpenUpdateAddressModal(true)
    }

    const handleGoBackUpateAddressModal = () => {
        onOpen()
    }

    return (
        <>
            <CreateAddressModal open={openCreateAddressModal} onClose={() => setOpenCreateAddressModal(false)} onSubmitCreateAddress={handleSubmitCreateAddress} />
            <UpdateAddressModal
                addressDetailUpdate={addressDetailUpdate}
                maxWidth='xs'
                open={openUpdateAddressModal}
                onClose={handleCloseUpdateAddressModal}
                onGoBack={handleGoBackUpateAddressModal}
            />
            <Dialog maxWidth='xs' fullWidth open={open} onClose={handleCloseUserAddress}>
                <DialogTitle sx={{ fontSize: '2rem', borderBottom: '1px solid rgba(0, 0, 0, .09)' }}>My Address</DialogTitle>
                <DialogContent sx={{ padding: '10px' }}>
                    <FormControl sx={{ width: '100%' }}>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={radioAddressId}
                            onChange={handleRadioChange}
                        >
                            <List>
                                {addressList?.length > 0 && addressList.map((address: any) => (
                                    <ListItem key={address._id} sx={{ display: 'flex', padding: '10px' }}>
                                        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'flex-start', }}>
                                            <div style={{ display: 'flex', width: '100%', alignItems: 'flex-start' }}>
                                                <FormControlLabel value={address._id} control={<Radio />} label="" />
                                                <div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', gap: '5px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <div style={{ display: 'flex', fontSize: '1.4rem', alignItems: 'center', justifyContent: 'center' }}>
                                                            <div style={{ borderRight: '.5px solid rgba(0, 0, 0, .26)', padding: '0 4px' }}>{address.recipient}</div>
                                                            <div style={{ color: 'rgba(0, 0, 0, .54)', fontSize: '1.3rem', padding: '0 4px' }}>{address.phone}</div>
                                                        </div>
                                                    </div>
                                                    <div style={{ color: 'rgba(0, 0, 0, .54)', fontSize: '1.3rem' }}>{address.address}</div>
                                                    {address.isDefaultAddress && <div style={{ color: 'red', fontSize: '1rem', padding: '0 4px', border: '.5px solid red' }}>Default Address</div>}

                                                </div>
                                            </div>
                                            <button
                                                type='button'
                                                style={{
                                                    background: 'none',
                                                    border: 0,
                                                    color: '#08f',
                                                    outline: 'none',
                                                    fontSize: '1.3rem',
                                                    padding: '4px',
                                                    whiteSpace: 'nowrap',
                                                    cursor: 'pointer'
                                                }}
                                                onClick={() => handleOpenUpdateAddressModal(address?._id)}>Update</button>
                                        </div>
                                    </ListItem>
                                ))}
                            </List>
                        </RadioGroup>
                    </FormControl>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button type='button' onClick={() => setOpenCreateAddressModal(true)} style={{ fontSize: '1rem', padding: '5px' }}> + Add new address</button>
                    </div>
                </DialogContent>

                <DialogActions sx={{ display: 'flex', gap: '10px', padding: '10px 24px', borderTop: '1px solid rgba(0, 0, 0, .09)' }}>
                    <button type='button' style={{ padding: '10px' }} onClick={handleCloseUserAddress}>Cancel</button>
                    <button type="button" style={{ padding: '10px', backgroundColor: 'var(--primary)', color: 'var(--white)' }} onClick={handleConfirmAddressChange}>Confirm</button>
                </DialogActions>
            </Dialog>
        </>
    )
}
