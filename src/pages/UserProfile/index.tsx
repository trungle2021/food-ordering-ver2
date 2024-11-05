import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { InputField } from '~/components/common/FormControls/InputField'
import { HeaderPage } from '~/components/specific/HeaderPage'


// interface UserProfileFormValues: BaseUser = {
    
// }

export const UserProfile = () => {
    const [avatarPreview, setAvatarPreview] = useState<string>('/src/assets/images/Avatar.png')
    const avatarInputRef = useRef<HTMLInputElement | null>(null);

    const { handleSubmit, control, register, setValue } = useForm({
        // defaultValues
    })

    const onSubmit = (data: any) => {
        console.log(data)
    }

    const onError = () => {

    }

    const handleClickChangePhoto = () => {
        if (avatarInputRef.current) {
            avatarInputRef.current.click();
        }
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setAvatarPreview(imageUrl)
             setValue('avatar', file)
        }
    }

    return (
        <>
            <HeaderPage pageName="User Profile" />
            <form onSubmit={handleSubmit(onSubmit, onError)}>
                <Grid container rowSpacing={5} sx={{ padding: '0 300px' }} >
                    {/* PHOTO PROFILE */}
                    <Grid item xs={12}>
                        <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
                            <label style={{ alignSelf: 'start', paddingLeft: '30px' }} htmlFor="">Photo Profile</label>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <Box
                                    component="img"
                                    src={avatarPreview}
                                    alt="Avatar preview"
                                    sx={{ width: 150, height: 150, objectFit: 'fill' }}
                                />
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <InputField 
                                        sx={{ display: 'none' }} 
                                        inputRef={avatarInputRef} 
                                        hidden 
                                        type="file" 
                                        name='avatar' 
                                        control={control} 
                                        register={register}
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                    <button type="button" onClick={handleClickChangePhoto} style={{ padding: '10px' }}>
                                        Change photo
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                                <InputField label='Full Name' name='name' type="text" control={control} />
                            </Grid>
                            <Grid item xs={12}>
                                <InputField label='Email' name='email' type="text" control={control} />
                            </Grid>
                            <Grid item xs={12}>
                                <InputField label='Address' name='address' type="text" control={control} />
                            </Grid>
                            <Grid item xs={12}>
                                <InputField label='Phone' name='phone' type="text" control={control} />
                            </Grid>

                   
                    <Grid item xs={12}>
                        <Grid container justifyContent="flex-end">
                            <button type='submit' style={{ padding: '20px', backgroundColor: 'var(--primary)', color: 'var(--white)' }}>Save</button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>

        </>
    )
}
