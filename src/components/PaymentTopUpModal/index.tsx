import { Breakpoint, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, Input, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from '@mui/material'
import { useState } from 'react'
import { InputField } from '../FormControls/InputField'
import { Controller, useForm } from 'react-hook-form'
import { PAYMENT_METHOD } from '~/utils/static'
import { yupResolver } from '@hookform/resolvers/yup'
import topUpSchemaValidator from '~/components/PaymentTopUpModal/topUpValidator'
import { topUp } from '~/features/Balance/balanceAction'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

type PaymentTopUpModalProps = {
    open: boolean
    onClose: () => void,
    maxWidth?: false | Breakpoint | undefined;
}

type TopUpFormValues = {
    paymentMethod: '';
    amount: string;
}

const initialFormValues: TopUpFormValues = {
    paymentMethod: '',
    amount: '',
};

const paymentSource = [
    {
        name: PAYMENT_METHOD.MOMO,
        value: '0375958748'
    },
    {
        name: PAYMENT_METHOD.BANK,
        value: 'VPBank - Ngân hàng Việt Nam Thịnh vượng **** 4370'
    }
]

export const PaymentTopUpModal = ({ open, onClose, maxWidth = 'sm' }: PaymentTopUpModalProps) => {

    const dispatch = useDispatch()
    const balance = useSelector((state: any) => state.balance)
    const [errors, setErrors] = useState<any>({})
    const { handleSubmit, control } = useForm({
        defaultValues: initialFormValues,
        resolver: yupResolver(topUpSchemaValidator),
        mode: 'onChange',

    })

    const handleOnClose = () => onClose()
    const onError = (errors: any) => setErrors(errors)

    const onSubmit = (formData: any) => {
        const selectedItem = paymentSource.find((item) => item.value === formData.paymentMethod);

        if (selectedItem) {
            const data = {
                balance_source: selectedItem.name,
                payment_method: formData.paymentMethod,
                amount: formData.amount
            }
            dispatch<any>(topUp(data))
            if(!balance.errors){
                onClose()
                toast.success('Top up successfully')
            }
        }
    }

    return (
        <>
            <Dialog fullWidth maxWidth={maxWidth} open={open} onClose={handleOnClose}>
                <form noValidate onSubmit={handleSubmit(onSubmit, onError)}>
                    <DialogTitle sx={{ fontSize: '2rem' }}>Top Up</DialogTitle>
                    <DialogContent>
                        <div style={{ padding: '20px 0' }}>
                            <FormControl fullWidth error={Boolean(errors?.paymentMethod)}>
                                <InputLabel id="balance-source-select-label">Balance Source</InputLabel>
                                <Controller
                                    name="paymentMethod"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            labelId="payment-method-select-label"
                                            id="payment-method-select"
                                            label="Payment Method"
                                            value={field.value}
                                            onChange={(event) => {
                                                field.onChange(event)
                                                setErrors({})
                                            }}
                                            renderValue={(selected) => {
                                                const selectedItem = paymentSource.find((item) => item.value === selected);
                                                return selectedItem ? `${selectedItem.value}` : 'Select an option';
                                            }}
                                        >
                                            {paymentSource.map((payment: any) => {
                                                return (
                                                    <MenuItem key={payment.name} value={payment.value}>{payment.name}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    )}
                                />
                                {errors?.paymentMethod && <FormHelperText sx={{ color: 'red' }}>{errors?.paymentMethod?.message}</FormHelperText>}

                            </FormControl>
                        </div>
                        <div >
                            <div>
                                <InputField
                                    sx={{
                                        '& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button': {
                                            'WebkitAppearance': 'none',
                                            margin: 0,
                                        },
                                        '& input[type=number]': {
                                            'MozAppearance': 'textfield',
                                        },
                                    }}
                                    label="Amount"
                                    name="amount"
                                    type="text"
                                    control={control}
                                /></div>
                        </div>
                    </DialogContent>
                    <DialogActions sx={{ display: 'flex', gap: '10px', margin: '10px 24px' }}>
                        <button type='button' style={{ padding: '10px' }} onClick={handleOnClose}>Cancel</button>
                        <button type="submit" style={{ padding: '10px', backgroundColor: 'var(--primary)', color: 'var(--white)' }}>Confirm</button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}
