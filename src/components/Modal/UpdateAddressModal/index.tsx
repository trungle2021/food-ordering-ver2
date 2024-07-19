import { Breakpoint, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, FormControl, InputLabel } from '@mui/material'
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { CheckBoxField } from '~/components/FormControls/CheckBoxField';
import { InputField } from '~/components/FormControls/InputField'
import { updateAddress } from '~/features/User/userAction';
import { AddressResponse } from '~/interface/user/addressResponse';

type UpdateAddressModalProps = {
    userAddress: AddressResponse | null,
    open: boolean
    onClose: () => void,
    maxWidth?: false | Breakpoint | undefined;
    onGoBack: () => void,
}



export const UpdateAddressModal = ({ open, onClose, maxWidth, userAddress, onGoBack }: UpdateAddressModalProps) => {

    const dispatch = useDispatch()
    const { handleSubmit, reset, control } = useForm({
        defaultValues: {
            _id: '',
            recipient: '',
            phone: '',
            address: '',
            is_default_address: false
        }
    })

    useEffect(() => {
        if (userAddress) {
            reset({
                _id: userAddress._id,
                recipient: userAddress.recipient,
                phone: userAddress.phone,
                address: userAddress.address,
                is_default_address: userAddress.is_default_address
            });
        }
    }, [userAddress, reset]);

    const onSubmit = (data: any) => {
        dispatch<any>(updateAddress(data)).then((response:any) => {
            console.log(response)
        })
    }

    const onError = (errors: any) => {
        console.log(errors)
    }

    const handleClickGoBackBtn = () => {
        onClose()
        onGoBack()
    }

    const handleOnClose: DialogProps["onClose"] = (event, reason) => {
        if (reason && reason === "backdropClick")
            return;
        onClose();
    }

    return (
        <Dialog fullWidth maxWidth={maxWidth} open={open} onClose={handleOnClose}>
            <form noValidate onSubmit={handleSubmit(onSubmit, onError)}>
                <DialogTitle sx={{ fontSize: '2rem' }}>Top Up</DialogTitle>
                <DialogContent>

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
                            checked={true}
                            control={control}
                        />
                    </div>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', gap: '10px', margin: '10px 24px' }}>
                    <button type='button' style={{ padding: '10px' }} onClick={handleClickGoBackBtn}>Go Back</button>
                    <button type="submit" style={{ padding: '10px', backgroundColor: 'var(--primary)', color: 'var(--white)' }}>Update</button>
                </DialogActions>
            </form>
        </Dialog>
    )
}
