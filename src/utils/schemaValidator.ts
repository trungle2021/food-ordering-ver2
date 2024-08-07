import * as yup from 'yup';

export const emailValidator = yup.string()
    .email('Invalid email format')
    .required('Email is required');

export const passwordValidator = yup.string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters')
    .max(15, 'Password must not exceed 15 characters');

export const passwordConfirmValidator = yup.string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required");

export const nameValidator = yup.string()
    .matches(/^[\u00C0-\u1EFFA-Za-z\s]+$/, 'Name must contain letters and spaces only, no special characters or numbers')
    .required('Name is required');

export const phoneValidator = yup.string()
    .required('Phone is required')
    .matches(/^[0-9]+$/, "Phone number must be only digits")
    .min(10, 'Phone must be at least 10 characters')
    .max(15, 'Phone must not exceed 15 characters');

export const paymentMethodValidator = yup.string()
    .required('Payment method is required')

export const recipientValidator = yup.string()
    .required('Recipient is required')
    .matches(/^[\u00C0-\u1EFFA-Za-z\s]+$/, 'Name must contain letters and spaces only, no special characters or numbers');

export const addressValidator = yup.string()
    .matches(/^[\u00C0-\u1EFFA-Za-z0-9,\s]+$/, 'Address must contain letters and spaces only, no special characters or numbers')
    .required('Address is required');

export const isDefaultAddressValidator = yup.boolean()

export const numberValidator = yup.string()
    .transform((value) => value.trim())
    .required('Amount is required')
    .test(
        'is-decimal',
        'Amount must be a number',
        (value) => {
            const valueIsNotANumber = isNaN(value as any)
            const floatNumber = parseFloat(value)
            const floatNumberIsUndefined = floatNumber === undefined
            const floatNumberIsZero = floatNumber == 0

            if (valueIsNotANumber || floatNumberIsUndefined || (floatNumberIsUndefined && floatNumberIsZero)) return false
            return true
        }
    )
    .test('greater-than-zero', 'Amount must be greater than 0', (value) => parseFloat(value) > 0)




