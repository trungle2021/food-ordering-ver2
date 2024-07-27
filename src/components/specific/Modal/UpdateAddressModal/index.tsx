import { yupResolver } from '@hookform/resolvers/yup';
import { Breakpoint, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, FormControl, InputLabel } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AddressResponse } from '~/interface/user/addressResponse';
import updateAddressValidator from './updateAddressValidator';
import { InputField } from '~/components/common/FormControls/InputField';
import { CheckBoxField } from '~/components/common/FormControls/CheckBoxField';
import { updateAddress } from '~/store/user/userAction';


type UpdateAddressModalProps = {
    addressDetailUpdate: AddressResponse | null,
    open: boolean
    onClose: () => void,
    maxWidth?: false | Breakpoint | undefined;
    onGoBack: () => void,
}



export const UpdateAddressModal = ({ open, onClose, maxWidth, addressDetailUpdate, onGoBack }: UpdateAddressModalProps) => {

    const dispatch = useDispatch()
    const userId = useSelector((state: any) => state.user.user._id)
    const [address, setAddress] = useState< AddressResponse| null>(null);
    const { handleSubmit, reset, control } = useForm({
        defaultValues: {
            recipient: '',
            phone: '',
            address: '',
            is_default_address: false
        },
        resolver: yupResolver(updateAddressValidator),
        mode: 'onChange',
    })

    useEffect(() => {
        if (addressDetailUpdate) {
            setAddress(addressDetailUpdate)
            reset({
                recipient: addressDetailUpdate.recipient,
                phone: addressDetailUpdate.phone,
                address: addressDetailUpdate.address,
                is_default_address: addressDetailUpdate.is_default_address
            });
        }
    }, [addressDetailUpdate, reset]);

    const onSubmit = (data: any) => {
        if(address){
            const addressDetail = {
                addressId: address._id,
                recipient: data.recipient,
                phone: data.phone,
                address: data.address,
                is_default_address: data.is_default_address
            }
            dispatch<any>(updateAddress({userId,addressDetail})).then((response: any) => {
                if (response.meta.requestStatus === 'rejected') {
                     toast.error("Update Address Failed")
                }else if(response.meta.requestStatus === 'fulfilled'){
                     toast.success("Update Address Successfully")
                }
                onClose()
                return
            })
        }
    }

    const onError = (errors: any) => {
        console.log(errors)
    }

    const handleClickGoBackBtn = () => {
        onClose()
        onGoBack()
    }

    const handleOnClose: DialogProps["onClose"] = (event: React.SyntheticEvent, reason) => {
        if (reason && reason === "backdropClick") return;
        event.preventDefault()
        event.stopPropagation()
        onClose();
    }

    return (
        <Dialog fullWidth maxWidth={maxWidth} open={open} onClose={handleOnClose}>
            <form noValidate onSubmit={handleSubmit(onSubmit, onError)}>
                <DialogTitle  sx={{ fontSize: '2rem', borderBottom: '1px solid rgba(0, 0, 0, .09)' }}>Update my address</DialogTitle>
                <DialogContent  sx={{ padding: '10px 24px', paddingTop: '10px !important' }}>
                    <div style={{ display: 'flex', gap: '10px', flexDirection: 'column', padding: '10px' }}>
                        <InputField
                            label="Id"
                            name="_id"
                            type="text"
                            sx={{ display: 'none' }}
                            control={control}
                        />
                        <InputField
                            label="Recipient"
                            name="recipient"
                            type="text"
                            control={control}
                        />
                        <InputField
                            label="Phone"
                            name="phone"
                            type="text"
                            control={control}
                        />
                        <InputField
                            label="Address"
                            name="address"
                            type="text"
                            control={control}
                        />
                        <CheckBoxField
                            label="Set as default address"
                            name="is_default_address"
                            disabled={address?.is_default_address}
                            control={control}
                        />
                    </div>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', gap: '10px', padding: '10px 24px', borderTop: '1px solid rgba(0, 0, 0, .09)' }}>
                    <button type='button' style={{ padding: '10px' }} onClick={handleClickGoBackBtn}>Go Back</button>
                    <button type="submit" style={{ padding: '10px', backgroundColor: 'var(--primary)', color: 'var(--white)' }}>Update</button>
                </DialogActions>
            </form>
        </Dialog>
    )
}
