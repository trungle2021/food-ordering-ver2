import * as yup from "yup";
import { numberValidator, paymentMethodValidator } from "~/utils/schemaValidator";

const schema = yup.object().shape({
  amount: numberValidator,
  paymentMethod: paymentMethodValidator,
});
export default schema;
