import * as yup from "yup";
import { emailValidator, passwordValidator } from "~/utils/schemaValidator";

const schema = yup.object().shape({
  email: emailValidator,
  password: passwordValidator,
  rememberMe: yup.boolean(),
});
export default schema;
