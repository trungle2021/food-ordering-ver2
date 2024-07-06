import { Breakpoint, Dialog, DialogActions, DialogContent, DialogTitle, Input, TextField } from '@mui/material'
import { max } from 'date-fns'
import { useState } from 'react'
import { InputField } from '../FormControls/InputField'
import { useForm } from 'react-hook-form'
import { Dropdown } from 'rsuite'
import { PAYMENT_METHOD } from '~/utils/static'

type PaymentTopUpModalProps = {
    open: boolean
    onClose: () => void,
    maxWidth: false | Breakpoint | undefined;
}

type TopUpFormValues = {
    paymentMethod: string;
    amount: number
}

const initialFormValues: TopUpFormValues = {
    paymentMethod: '',
    amount: 0,
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




export const PaymentTopUpModal = ({ open, onClose, maxWidth }: PaymentTopUpModalProps) => {

    const { handleSubmit, control } = useForm({
        defaultValues: {
            paymentMethod: PAYMENT_METHOD.BANK,
            amount: ''
        },
        mode: 'onBlur',

    })
    const [sourceBalance, setSourceBalane] = useState('Choose balance source')

    const handleChangeSourceBalance = (eventKey: string | null) => {
        const paymentSourceSelected = paymentSource.find(item => item.name === eventKey)
        if(paymentSourceSelected){
            setSourceBalane(paymentSourceSelected.value)
        }
    }
    const handleOnClose = () => {
        onClose()
    }

    const onSubmit = (data: any) => {
        console.log(data)
    }
    const onError = (errors: any) => {
        console.log(errors)
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
            <Dialog fullWidth maxWidth={maxWidth} open={open} onClose={handleOnClose}>
                <DialogTitle sx={{fontSize: '2rem'}}>Top Up</DialogTitle>
                <DialogContent>
                    <div> Balance Source: 
                    <Dropdown title={sourceBalance} onSelect={handleChangeSourceBalance}  style={{padding: '20px'}}>
                        {paymentSource.map((payment: any) => {
                            return (
                                <Dropdown.Item key={payment.name} eventKey={payment.name}>{payment.name}</Dropdown.Item>
                            )
                        })}
                    </Dropdown>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                       <div> Amount: </div>
                    <InputField
                        sx={{
                            '& label': { fontSize: '1.4rem' },
                            '& input': { fontSize: '1.4rem' },
                            '& legend': { display: 'none' },
                            '& fieldset': { top: 0 },
                            padding: '20px'
                        }}
                        name="amount"
                        type="text"
                        control={control}
                    />
                    </div>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', gap: '10px', margin: '10px 24px' }}>
                    <button type='button' style={{ padding: '10px' }} onClick={handleOnClose}>Cancel</button>
                    <button type="submit" style={{ padding: '10px', backgroundColor: 'var(--primary)', color: 'var(--white)' }}>Confirm</button>
                </DialogActions>
            </Dialog>
        </form>
        </>
    )
}
