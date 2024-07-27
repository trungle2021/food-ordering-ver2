import * as yup from "yup";
import { emailValidator, nameValidator, passwordConfirmValidator, passwordValidator, phoneValidator } from "~/utils/schemaValidator";

const schema = yup.object().shape({
  email: emailValidator,
  password: passwordValidator,
  cpassword: passwordConfirmValidator,
  name: nameValidator,
  phone: phoneValidator
});

export default schema;
