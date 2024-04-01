import * as yup from 'yup';

const schema = yup.object().shape({
    phone: yup.string()
      .min(10, 'Phone number must be at least 10 characters')
      .max(15, 'Phone number must not exceed 15 characters')
      .required('Phone number is required'),
    password: yup.string()
      .min(5, 'Password must be at least 5 characters')
      .max(15, 'Password must not exceed 15 characters')
      .required('Password is required'),
  });

export default schema;