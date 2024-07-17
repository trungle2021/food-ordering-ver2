import { Breakpoint, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel } from '@mui/material'
import { useForm } from 'react-hook-form';
import { InputField } from '~/components/FormControls/InputField'

type UpdateAddressModalProps = {
    open: boolean
    onClose: () => void,
    maxWidth?: false | Breakpoint | undefined;
}

type UpdateAddressFormValues = {
    recipient: string;
    phone: string;
    address: string;
    is_default_address: boolean;
}

const initialFormValues: UpdateAddressFormValues= {
    recipient: '',
    phone: '',
    address: '',
    is_default_address: false
}

export const UpdateAddressModal = ({open, onClose, maxWidth}: UpdateAddressModalProps) => {
    const {handleSubmit, control} = useForm({
        defaultValues: initialFormValues
    })

    const onSubmit = (data: any) => {
        console.log(data)
    }

    const onError = (errors: any) => {
        console.log(errors)
    }

    const handleOnClose = () => onClose()
  return (
    <Dialog fullWidth maxWidth={maxWidth} open={open} onClose={handleOnClose}>
                <form noValidate onSubmit={handleSubmit(onSubmit, onError)}>
                    <DialogTitle sx={{ fontSize: '2rem' }}>Top Up</DialogTitle>
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
                    </DialogContent>
                    <DialogActions sx={{ display: 'flex', gap: '10px', margin: '10px 24px' }}>
                        <button type='button' style={{ padding: '10px' }} onClick={handleOnClose}>Go Back</button>
                        <button type="submit" style={{ padding: '10px', backgroundColor: 'var(--primary)', color: 'var(--white)' }}>Update</button>
                    </DialogActions>
                </form>
            </Dialog>
  )
}
