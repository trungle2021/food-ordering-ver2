import { yupResolver } from '@hookform/resolvers/yup';
import { Breakpoint, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup, RadioGroup } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { InputField } from '../FormControls/InputField';

type AddAddressModalProps = {
    open: boolean
    onClose: () => void,
    maxWidth?: false | Breakpoint | undefined;
}

type AddAddressFormValues = {
    paymentMethod: '';
    amount: string;
}

const initialFormValues: AddAddressFormValues = {
    paymentMethod: '',
    amount: '',
};

export const AddAddressModal = ({ open, onClose, maxWidth = 'sm' }: AddAddressModalProps) => {
    const [errors, setErrors] = useState<any>({})
    const { handleSubmit, control } = useForm({
        defaultValues: initialFormValues,
        // resolver: yupResolver(),
        mode: 'onChange',

    })
    const handleOnClose = () => onClose()
    const onError = (errors: any) => setErrors(errors)

    const onSubmit = (formData: any) => {

    }

    return (
        <>
            <Dialog fullWidth maxWidth={maxWidth} open={open} onClose={handleOnClose}>
                <form></form>
                <DialogTitle>Add New Address</DialogTitle>
                <DialogContent>
                    <div style={{display: 'flex', gap: '10px', flexDirection: 'column', padding: '10px'}}>
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
            </Dialog>
        </>
    )
}

