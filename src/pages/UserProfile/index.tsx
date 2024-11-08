import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import styles from './styles.module.css';
import { InputField } from '~/components/common/FormControls/InputField';
import { LocationIcon } from '~/components/common/UI/Icon';
import { HeaderPage } from '~/components/specific/HeaderPage';
import { CreateAddressModal } from '~/components/specific/Modal/CreateAddressModal';
import { UserAddressModal } from '~/components/specific/Modal/UserAddressModal';
import { useAddress } from '~/hooks/useAddress';
import { AddressResponse } from '~/interface/user/addressResponse';
import UserProfileFormValues from '~/interface/user/userProfileFormValues';
import UserService from '~/services/user/userService';
import { RootState } from '~/store/store';

export const UserProfile = () => {
  const [avatarPreview, setAvatarPreview] = useState('/src/assets/images/Avatar.png');
  const user = useSelector((state: RootState) => state.user);
  const avatarInputRef = useRef<HTMLInputElement | null>(null);
  const [openUserAddressModal, setOpenUserAddressModal] = useState(false);
  const [shippingAddress, setShippingAddress] = useState<AddressResponse | null>(null);
  const [openCreateAddressModal, setOpenCreateAddressModal] = useState(false);

  const {
    getAddress,
    getDefaultAddress,
    handleOpenUserAddress,
    handleCloseUserAddressModal,
    handleOpenCreateAddress,
    handleCloseCreateAddressModal,
    handleShippingAddressChange,
  } = useAddress({
    user,
    onAddressChange: setShippingAddress,
    onUserAddressModalChange: setOpenUserAddressModal,
    onCreateAddressModalChange: setOpenCreateAddressModal,
  });

  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors },
  } = useForm<UserProfileFormValues>({
    defaultValues: {
      name: user.user?.name,
      email: user.user?.email,
      user_address: shippingAddress?._id,
      phone: user.user?.phone,
    },
  });

  // Cleanup URL object on unmount or when preview changes
  useEffect(() => {
    // Set default address to shipping address
    const defaultAddress = getDefaultAddress();
    setShippingAddress(defaultAddress);
    return () => {
      if (avatarPreview.startsWith('blob:')) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const onSubmit = async (payload: UserProfileFormValues) => {
    try {
      const userId = user.user?._id;
      if (!userId) return;
      const response = await UserService.updateUserProfile(userId, payload);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleClickChangePhoto = () => {
    avatarInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      console.error('Please upload an image file');
      return;
    }

    // Validate file size (e.g., 5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      console.error('File size should be less than 5MB');
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setAvatarPreview(imageUrl);
    setValue('avatar', file, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <>
      <HeaderPage pageName="User Profile" />
      <UserAddressModal
        maxWidth="sm"
        open={openUserAddressModal}
        onOpen={handleOpenUserAddress}
        onClose={handleCloseUserAddressModal}
        onSubmit={handleShippingAddressChange}
        enableSwitchAddress={false}
      />
      <CreateAddressModal
        maxWidth="sm"
        open={openCreateAddressModal}
        onClose={handleCloseCreateAddressModal}
      />
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid
          container
          rowSpacing={5}
          sx={{
            padding: {
              xs: '0 20px',
              sm: '0 50px',
              md: '0 200px',
              lg: '0 300px',
            },
          }}
        >
          {/* Avatar Section */}
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
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
                    borderRadius: '8px',
                  }}
                />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <input
                    hidden
                    type="file"
                    name="avatar"
                    ref={avatarInputRef}
                    onChange={handleImageChange}
                  />
                  <button
                    type="button"
                    onClick={handleClickChangePhoto}
                    style={{
                      padding: '10px 20px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                    }}
                  >
                    Change photo
                  </button>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Full Name Section */}
          <Grid item xs={12}>
            <InputField
              label="Full Name"
              name="name"
              type="text"
              control={control}
              rules={{ required: 'Name is required' }}
            />
          </Grid>

          {/* Email Section */}
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
                  message: 'Invalid email address',
                },
              }}
            />
          </Grid>

          {/* Phone Section */}
          <Grid item xs={12}>
            <InputField
              label="Phone"
              name="phone"
              type="tel"
              control={control}
              rules={{
                pattern: {
                  value: /^[0-9+\-\s()]*$/,
                  message: 'Invalid phone number',
                },
              }}
            />
          </Grid>

          {/* Address Section */}
          <Grid item xs={12}>
          <div className="address-container">
              <div className={styles['title']}>Delivery Address: </div>
              <div className={styles['address-content']}>
                  <div className={styles['address-heading']}>
                      <LocationIcon />
                      <div>{shippingAddress?.address}</div>
                      {shippingAddress?.address ?
                      <button
                          type="button"
                          style={{ padding: '5px 15px', backgroundColor: 'var(--primary)', color: 'var(--white)' }}
                          onClick={handleOpenUserAddress}
                      >
                          Change
                      </button> : <button
                          type="button"
                          onClick={handleOpenCreateAddress}
                      >
                          Add Address
                      </button>}
                  </div>
              </div>
            </div>
          </Grid>
          {/* Save Button Section */}
          <Grid item xs={12}>
            <Grid container justifyContent="flex-end">
              <button
                type="submit"
                style={{
                  padding: '20px',
                  backgroundColor: 'var(--primary)',
                  color: 'var(--white)',
                }}
              >
                Save
              </button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
