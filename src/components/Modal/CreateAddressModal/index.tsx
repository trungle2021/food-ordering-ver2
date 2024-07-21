import { yupResolver } from '@hookform/resolvers/yup';
import { Breakpoint, Dialog, DialogActions, DialogContent, DialogTitle, FormGroup } from '@mui/material'
import { useForm } from 'react-hook-form';
import createAddressValidator from './createAddressValidator';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { InputField } from '~/components/FormControls/InputField';
import { CheckBoxField } from '~/components/FormControls/CheckBoxField';
import { createAddress } from '~/features/User/userAction';
import { AddressResponse } from '~/interface/user/addressResponse';

type CreateAddressModalProps = {
    open: boolean,
    onSubmitCreateAddress?: (address: AddressResponse) => void,
    onClose: () => void,
    maxWidth?: false | Breakpoint | undefined;
}

type CreateAddressFormValues = {
    recipient: string,
    phone: string,
    address: string,
    is_default_address: boolean,
}


export const CreateAddressModal = ({ open, onClose, maxWidth = 'sm', onSubmitCreateAddress }: CreateAddressModalProps) => {
    const dispatch = useDispatch()
    const user = useSelector((state: any) => state.user.user)
    const userAddressIsEmpty = user.user_address.length === 0
    const userId = user?._id
    const name = user?.name

    const initialFormValues: CreateAddressFormValues = {
        recipient: name,
        phone: '',
        address: '',
        is_default_address: true,
    };

    const { handleSubmit, reset, control } = useForm({
        defaultValues: initialFormValues,
        resolver: yupResolver(createAddressValidator),
        mode: 'onChange',

    })
    const handleOnClose = () => onClose()
    const onError = (errorsOnSubmit: any) => {
        toast.error(errorsOnSubmit)

    }

    const onSubmit = (formData: any) => {
        const addressDetail = {
            recipient: formData.recipient,
            phone: formData.phone,
            address: formData.address,
            is_default_address: formData.is_default_address
        }
        const payload = {
            userId,
            addressDetail
        }
        dispatch<any>(createAddress(payload)).then((result: any) => {
            if(result.meta.requestStatus === 'rejected'){
                handleOnClose()
                return toast.error("Add Address Failed")
            }else{
                handleOnClose()
                reset()
                const user = result.payload.data
                const addressCreated = user.user_address[user.user_address.length - 1]
                if(onSubmitCreateAddress){
                    onSubmitCreateAddress(addressCreated)
                    return toast.success("Address Added Successfully")
                }
            }
        })
    }

    return (
        <>
            <Dialog fullWidth maxWidth={maxWidth} open={open} onClose={handleOnClose}>
                <form noValidate onSubmit={handleSubmit(onSubmit, onError)}>
                    <DialogTitle sx={{ fontSize: '2rem', borderBottom: '1px solid rgba(0, 0, 0, .09)' }}>Add New Address</DialogTitle>
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
                                checked={userAddressIsEmpty}
                                disabled={userAddressIsEmpty}
                                control={control}
                            />
                        </FormGroup>

                    </DialogContent>
                    <DialogActions sx={{ display: 'flex', gap: '10px', padding: '10px 24px', borderTop: '1px solid rgba(0, 0, 0, .09)' }}>
                        <button type='button' style={{ padding: '10px' }} onClick={handleOnClose}>Cancel</button>
                        <button type="submit" style={{ padding: '10px', backgroundColor: 'var(--primary)', color: 'var(--white)' }}>Add</button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}

