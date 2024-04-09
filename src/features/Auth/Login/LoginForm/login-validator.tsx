import * as yup from 'yup';
import { emailValidator, passwordValidator } from '~/utils/schema-validator';

const schema = yup.object().shape({
  email: emailValidator,
  password: passwordValidator,
  rememberMe: yup.boolean()
})
export default schema;