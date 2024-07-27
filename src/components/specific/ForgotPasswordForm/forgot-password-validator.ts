import * as yup from "yup";
import { emailValidator } from "~/utils/schemaValidator";

const schema = yup.object().shape({
  email: emailValidator,
});
export default schema;
