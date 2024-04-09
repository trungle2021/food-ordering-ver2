import * as yup from 'yup';
import { emailValidator } from '~/utils/schema-validator';

const schema = yup.object().shape({
  email: emailValidator
})
export default schema;