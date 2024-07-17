import { Breakpoint, Dialog, DialogActions, DialogTitle, FormControl, FormControlLabel, List, ListItem, Radio, RadioGroup } from '@mui/material'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAddress } from '~/features/Auth/authSlice';
import UserService from "~/services/user/userService"

type UserAddressModalProps = {
    open: boolean,
    onSubmit: (data: any) => void,
    onClose: () => void,
    maxWidth?: false | Breakpoint | undefined;
}

type UserAddressFormValues = {

}

const initialFormValues: UserAddressFormValues = {

};

const sortAddressListByDefaultAddress = (addressList: any) => {
    return addressList.sort((a: any, b: any) => {
        if (a.is_default_address) {
            return -1
        }
        return 1
    })
}

export const UserAddressModal = ({ open, onClose, onSubmit }: UserAddressModalProps) => {

    const dispatch = useDispatch()
    const userId = useSelector((state: any) => state.auth?.user?._id)
    const [addressList, setAddressList] = useState([])
    const [addressId, setAddressId] = useState('');
    useEffect(() => {
        if (userId && open) {
            UserService.getUserAddressList(userId).then((response) => {
                // sort with default address first
                const sortedAddressList = sortAddressListByDefaultAddress(response.data)
                const defaultAddress = sortedAddressList.find((address: any) => address.is_default_address)
                if (defaultAddress) {
                    setAddressId(defaultAddress?._id)
                }
                setAddressList(sortedAddressList)
            }).catch((error) => {
                console.log(error)
            })
        }
    }, [userId, open])

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const addressId = (event.target as HTMLInputElement).value;
        setAddressId(addressId);
    };

    const handleConfirmAddressChange = () => {
        // call API to set default address
        dispatch<any>(updateAddress({ userId, addressId })).then((response: any) => {
            if (response.payload) {
                onSubmit(response.payload)
            }
        })
    }

    const handleCloseUserAddress = () => onClose()

    const handleOpenUpdateAddressModal = () => {

    }
    return (
        <Dialog maxWidth='xs' fullWidth open={open} onClose={handleCloseUserAddress}>
            <DialogTitle sx={{ fontSize: '2rem' }}>My Address</DialogTitle>
            <FormControl>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={addressId}
                    onChange={handleRadioChange}
                >
                    <List>
                        {addressList?.length > 0 && addressList.map((address: any) => (
                            <ListItem key={address._id} sx={{ padding: '30px' }}>
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
                                    <div style={{
                                        background: 'none',
                                        border: 0,
                                        color: '#08f',
                                        outline: 'none',
                                        fontSize: '1.3rem',
                                        padding: '4px',
                                        whiteSpace: 'nowrap',
                                        cursor: 'pointer'
                                    }} onClick={handleOpenUpdateAddressModal}>Update</div>
                                </div>
                            </ListItem>
                        ))}
                    </List>
                </RadioGroup>
            </FormControl>
            <DialogActions sx={{ display: 'flex', gap: '10px', margin: '10px 24px' }}>
                <button style={{ padding: '10px' }} onClick={handleCloseUserAddress}>Cancel</button>
                <button style={{ padding: '10px', backgroundColor: 'var(--primary)', color: 'var(--white)' }} type="submit" onClick={handleConfirmAddressChange}>Confirm</button>
            </DialogActions>
        </Dialog>
    )
}
