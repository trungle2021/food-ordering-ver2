import * as yup from "yup";
import { addressValidator, isDefaultAddressValidator, phoneValidator, recipientValidator } from "~/utils/schemaValidator";

const schema = yup.object().shape({
    recipient: recipientValidator,
    phone: phoneValidator,
    address: addressValidator,
    is_default_address: isDefaultAddressValidator,
});
export default schema;
