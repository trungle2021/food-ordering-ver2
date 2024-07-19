import { yupResolver } from '@hookform/resolvers/yup';
import { Breakpoint, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup, RadioGroup } from '@mui/material'
import { useForm } from 'react-hook-form';
import addAddressValidator from './addAddressValidator';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { InputField } from '~/components/FormControls/InputField';
import { CheckBoxField } from '~/components/FormControls/CheckBoxField';
import { createAddress } from '~/features/User/userAction';
import { updateAddressInState } from '~/features/User/userSlice';

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
    const user = useSelector((state: any) => state.user.user._id)
    const userHasDefaultAddress = user?.user_address.length > 0 
    const userId = user?._id
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
        const payload = {
            ...formData,
            userId
        }
        dispatch<any>(createAddress(payload)).then((result: any) => {
            if(result.error){
                handleOnClose()
                return toast.error("Add Address Failed")
            }
            dispatch<any>(updateAddressInState(result))
            handleOnClose()
                return toast.success("Address Added Successfully")

        })
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
                            <CheckBoxField
                                label="Set as default address"
                                name="is_default_address"
                                checked={userHasDefaultAddress}
                                control={control}
                            />
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

