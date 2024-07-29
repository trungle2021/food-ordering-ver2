import { Breakpoint, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, Input, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from '@mui/material'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { PAYMENT_METHOD } from '~/utils/static'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import topUpSchemaValidator from '~/components/specific/Modal/PaymentTopUpModal/topUpValidator';
import { InputField } from '~/components/common/FormControls/InputField'
import { topUp } from '~/store/balance/balanceAction'

type PaymentTopUpModalProps = {
    open: boolean
    onClose: () => void,
    maxWidth?: false | Breakpoint | undefined;
}

type TopUpFormValues = {
    amount: string;
    paymentMethodId: string;
}

const initialFormValues: TopUpFormValues = {
    amount: '',
    paymentMethodId: '',
};

const paymentSource = [
    {
        id: '101',
        name: PAYMENT_METHOD.MOMO,
        value: '0375958748'
    },
    {
        id: '102',
        name: PAYMENT_METHOD.BANK,
        value: 'VPBank - Ngân hàng Việt Nam Thịnh vượng **** 4370'
    }
]

export const PaymentTopUpModal = ({ open, onClose, maxWidth = 'sm' }: PaymentTopUpModalProps) => {

    const dispatch = useDispatch()
    const userId = useSelector((state: any) => state.user.user._id)
    const [errors, setErrors] = useState<any>({})
    const { handleSubmit, reset, control } = useForm({
        defaultValues: initialFormValues,
        resolver: yupResolver(topUpSchemaValidator),
        mode: 'onChange',

    })

    const handleOnClose = () => onClose()
    const onError = (errors: any) => setErrors(errors)

    const onSubmit = (formData: any) => {
        console.log("topup")
        const payload = {
            ...formData,
            userId,
        }
        dispatch<any>(topUp(payload)).then((result: any) => {
            console.log("Result.error: ", result.error)
            console.log("Result: ", result)
            if (result.error) {
                toast.error("Top up failed")
            } else {
                onClose()
                reset()
                toast.success('Top up successfully')
            }
        })

    }

    return (
        <>
            <Dialog fullWidth maxWidth={maxWidth} open={open} onClose={handleOnClose}>
                <form noValidate onSubmit={handleSubmit(onSubmit, onError)}>
                    <DialogTitle sx={{ fontSize: '2rem', borderBottom: '1px solid rgba(0, 0, 0, .09)' }}>Top Up</DialogTitle>
                    <DialogContent>
                        <div style={{ padding: '20px 0' }}>
                            <FormControl fullWidth error={Boolean(errors?.paymentMethodId)}>
                                <InputLabel id="balance-source-select-label">Payment Method</InputLabel>
                                <Controller
                                    name="paymentMethodId"
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
                                                const selectedItem = paymentSource.find((item) => item.id === selected);
                                                return selectedItem ? `${selectedItem.value}` : 'Select an option';
                                            }}
                                        >
                                            {paymentSource.map((payment: any) => {
                                                return (
                                                    <MenuItem key={payment.name} value={payment.id}>{payment.name}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    )}
                                />
                                {errors?.paymentMethodId && <FormHelperText sx={{ color: 'red' }}>{errors?.paymentMethodId?.message}</FormHelperText>}

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
                    <DialogActions sx={{ display: 'flex', gap: '10px', padding: '10px 24px', borderTop: '1px solid rgba(0, 0, 0, .09)' }}>
                        <button type='button' style={{ padding: '10px' }} onClick={handleOnClose}>Cancel</button>
                        <button type="submit" style={{ padding: '10px', backgroundColor: 'var(--primary)', color: 'var(--white)' }}>Confirm</button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}
