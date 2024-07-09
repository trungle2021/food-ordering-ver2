import { yupResolver } from '@hookform/resolvers/yup';
import { Breakpoint, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup, RadioGroup } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { InputField } from '../FormControls/InputField';
import addAddressValidator from './addAddressValidator';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

type AddAddressModalProps = {
    open: boolean
    onClose: () => void,
    maxWidth?: false | Breakpoint | undefined;
}

type AddAddressFormValues = {
    recipient: string,
    phone: string,
    address: string,
    is_default_address: boolean,
}


export const AddAddressModal = ({ open, onClose, maxWidth = 'sm' }: AddAddressModalProps) => {
    const dispatch = useDispatch()
    const {user} = useSelector((state:any) => state.auth)
    const name = user?.name

    const initialFormValues: AddAddressFormValues = {
        recipient: name,
        phone: '',
        address: '',
        is_default_address: true,
    };
    
    const { handleSubmit, control } = useForm({
        defaultValues: initialFormValues,
        resolver: yupResolver(addAddressValidator),
        mode: 'onChange',

    })
    const handleOnClose = () => onClose()
    const onError = (errorsOnSubmit: any) => {
        toast.error(errorsOnSubmit)

    }

    const onSubmit = (formData: any) => {
        console.log(formData)
        dispatch<any>(addAddress(formData))
    }

    return (
        <>
            <Dialog fullWidth maxWidth={maxWidth} open={open} onClose={handleOnClose}>
                <form noValidate onSubmit={handleSubmit(onSubmit, onError)}>
                    <DialogTitle>Add New Address</DialogTitle>
                    <DialogContent>
                        <div style={{ display: 'flex', gap: '10px', flexDirection: 'column', padding: '10px' }}>
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
                        </div>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox name='is_default_address' defaultChecked />} label="Set as default address" />
                        </FormGroup>
                    </DialogContent>
                    <DialogActions sx={{ display: 'flex', gap: '10px', padding: '10px 24px' }}>
                        <button type='button' style={{ padding: '10px' }} onClick={handleOnClose}>Cancel</button>
                        <button type="submit" style={{ padding: '10px', backgroundColor: 'var(--primary)', color: 'var(--white)' }}>Add</button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}

