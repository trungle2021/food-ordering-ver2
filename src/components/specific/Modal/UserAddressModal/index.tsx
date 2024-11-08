import { Breakpoint, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, List, ListItem, Radio, RadioGroup } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { UpdateAddressModal } from '../UpdateAddressModal';
import { AddressResponse } from '~/interface/user/addressResponse';
import { CreateAddressModal } from '../CreateAddressModal';


interface UserAddressModalProps {
    open: boolean
    onOpen: () => void
    onClose: () => void
    onSubmit: (orderInfo: any) => void
    maxWidth?: false | Breakpoint | undefined
    enableSwitchAddress?: boolean
}

export const UserAddressModal = ({ open, onClose, onOpen, onSubmit, maxWidth, enableSwitchAddress }: UserAddressModalProps) => {
    const user = useSelector((state: any) => state.user.user)
    const [addressListSorted, setAddressListSorted] = useState<AddressResponse[]>([])
    const [radioAddressId, setRadioAddressId] = useState<string | null>(null)
    const [radioChanged, setRadioChanged] = useState(false)
    
    const [openUpdateAddressModal, setOpenUpdateAddressModal] = useState(false)
    const [addressDetailUpdate, setAddressDetailUpdate] = useState<AddressResponse | null>(null);
    const [openCreateAddressModal, setOpenCreateAddressModal] = useState(false)

    useEffect(() => {
        if (user?.user_address?.length > 0) {
            const defaultAddress = user.user_address.find(
                (address: AddressResponse) => address.is_default_address
            )
            const defaultAddressId = defaultAddress?._id || user.user_address[0]._id

            const sortedAddresses = [...user.user_address].sort((a, b) => 
                a._id === defaultAddressId ? -1 : b._id === defaultAddressId ? 1 : 0
            )
            
            setAddressListSorted(sortedAddresses)
            setRadioAddressId(defaultAddressId)
        }
        setRadioChanged(false)
    }, [user])


  
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const addressId = (event.target as HTMLInputElement).value;
        setRadioChanged(true)
        setRadioAddressId(addressId)
    };


    const handleConfirmAddressChange = async () => {
        if (radioChanged && radioAddressId) {
            onSubmit({ addressId: radioAddressId });
        }
    };

    const handleSubmitCreateAddress = (address: AddressResponse) => {
        console.log(address)
        // setAddress(address)
    }

    const handleCloseUpdateAddressModal = () => {
        onClose()
        setOpenUpdateAddressModal(false)
    }

    const handleCloseUserAddress = () => {
        // setRadioAddressId(currentShippingAddressId)
        onClose()
    }

    const handleOpenUpdateAddressModal = (addressId: string) => {
        const selectedAddress = addressListSorted.find((address: AddressResponse) => address._id === addressId);
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
            <Dialog maxWidth='xs' fullWidth open={open} onClose={handleCloseUserAddress} aria-modal="true">
                <DialogTitle sx={{ fontSize: '2rem', borderBottom: '1px solid rgba(0, 0, 0, .09)' }}>My Address</DialogTitle>
                <DialogContent sx={{ padding: '10px' }}>
                    <FormControl sx={{ width: '100%' }}>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={radioAddressId}
                            onChange={handleRadioChange}
                            sx={enableSwitchAddress ? undefined : { '& .MuiRadio-root': { display: 'none' } }}
                        >
                            <List>
                                {addressListSorted?.length > 0 && addressListSorted.map((address: any) => (
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
                                                    {address.is_default_address && <div style={{ color: 'red', fontSize: '1rem', padding: '0 4px', border: '.5px solid red' }}>Default Address</div>}

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
