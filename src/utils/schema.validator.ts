import * as yup from 'yup';

export const emailValidator = yup.string()
  .email('Invalid email format')
  .required('Email is required');

export const passwordValidator = yup.string()
  .required('Password is required')
  .min(5, 'Password must be at least 5 characters')
  .max(15, 'Password must not exceed 15 characters');
