import { Breakpoint, Dialog, DialogActions, DialogContent, DialogTitle, Input, TextField } from '@mui/material'
import { max } from 'date-fns'
import { useState } from 'react'
import { InputField } from '../FormControls/InputField'
import { useForm } from 'react-hook-form'

type PaymentTopUpModalProps = {
    open: boolean
    onClose: () => void,
    maxWidth: false | Breakpoint | undefined;
}
export const PaymentTopUpModal = ({ open, onClose, maxWidth }: PaymentTopUpModalProps) => {
    console.log(maxWidth)
    const handleOnClose = () => {
        onClose()
    }

    const { control } = useForm()

    return (
        <Dialog fullWidth maxWidth={maxWidth} open={open} onClose={handleOnClose}>
            <DialogTitle>Top Up</DialogTitle>
            <DialogContent>
                <InputField
                    label="Amount"
                    name="amount"
                    type="text"
                    control={control}
                />
            </DialogContent>
            <DialogActions sx={{ display: 'flex', gap: '10px', margin: '10px 24px' }}>
                <button style={{ padding: '10px' }} onClick={handleOnClose}>Cancel</button>
                <button style={{ padding: '10px', backgroundColor: 'var(--primary)', color: 'var(--white)' }} type="submit">Confirm</button>
            </DialogActions>
        </Dialog>
    )
}
