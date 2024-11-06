import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import { useRef, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { InputField } from '~/components/common/FormControls/InputField'
import { HeaderPage } from '~/components/specific/HeaderPage'

interface UserProfileFormValues {
    name: string
    email: string
    address: string
    phone: string
    avatar?: File
}

export const UserProfile = () => {
    const [avatarPreview, setAvatarPreview] = useState('/src/assets/images/Avatar.png')
    const avatarInputRef = useRef<HTMLInputElement | null>(null)

    const { handleSubmit, control, register, setValue, formState: { errors } } = useForm<UserProfileFormValues>({
        defaultValues: {
            name: '',
            email: '',
            address: '',
            phone: '',
        }
    })

    // Cleanup URL object on unmount or when preview changes
    useEffect(() => {
        return () => {
            if (avatarPreview.startsWith('blob:')) {
                URL.revokeObjectURL(avatarPreview)
            }
        }
    }, [avatarPreview])

    const onSubmit = async (data: UserProfileFormValues) => {
        try {
            console.log('Form data:', data)
            // Add your API call here
        } catch (error) {
            console.error('Error submitting form:', error)
        }
    }

    const handleClickChangePhoto = () => {
        avatarInputRef.current?.click()
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        // Validate file type
        if (!file.type.startsWith('image/')) {
            console.error('Please upload an image file')
            return
        }

        // Validate file size (e.g., 5MB limit)
        if (file.size > 5 * 1024 * 1024) {
            console.error('File size should be less than 5MB')
            return
        }

        const imageUrl = URL.createObjectURL(file)
        setAvatarPreview(imageUrl)
        setValue('avatar', file, { 
            shouldValidate: true,
            shouldDirty: true 
        })
    }

    return (
        <>
            <HeaderPage pageName="User Profile" />
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Grid 
                    container 
                    rowSpacing={5} 
                    sx={{ 
                        padding: { 
                            xs: '0 20px',
                            sm: '0 50px',
                            md: '0 200px',
                            lg: '0 300px' 
                        } 
                    }}
                >
                    {/* Avatar Section */}
                    <Grid item xs={12}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px'
                        }}>
                            <Box component="label" sx={{ alignSelf: 'start', pl: '30px' }}>
                                Photo Profile
                            </Box>
                            <Box sx={{ display: 'flex', gap: '20px' }}>
                                <Box
                                    component="img"
                                    src={avatarPreview}
                                    alt="Avatar preview"
                                    sx={{
                                        width: 150,
                                        height: 150,
                                        objectFit: 'cover',
                                        borderRadius: '8px'
                                    }}
                                />
                                <Box sx={{ 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    justifyContent: 'center' 
                                }}>
                                    <InputField 
                                        sx={{ display: 'none' }}
                                        type="file"
                                        name="avatar"
                                        control={control}
                                        register={register}
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                    <button 
                                        type="button"
                                        onClick={handleClickChangePhoto}
                                        style={{ 
                                            padding: '10px 20px',
                                            borderRadius: '4px',
                                            border: '1px solid #ccc'
                                        }}
                                    >
                                        Change photo
                                    </button>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <InputField 
                            label="Full Name" 
                            name="name" 
                            type="text" 
                            control={control}
                            rules={{ required: 'Name is required' }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputField 
                            label="Email" 
                            name="email" 
                            type="email" 
                            control={control}
                            rules={{ 
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address'
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputField 
                            label="Address" 
                            name="address" 
                            type="text" 
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputField 
                            label="Phone" 
                            name="phone" 
                            type="tel" 
                            control={control}
                            rules={{
                                pattern: {
                                    value: /^[0-9+\-\s()]*$/,
                                    message: 'Invalid phone number'
                                }
                            }}
                        />
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
