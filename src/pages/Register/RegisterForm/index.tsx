import { Link } from "react-router-dom";
import { Button, Stack, TextField } from "@mui/material";

export const RegisterForm = () => {
  return (
    <form>
      <Stack spacing={2} width={400}>
        <TextField type="text" name="phone" label="Phone number" />
        <Button type="submit" variant="contained" color="primary">
          Continue
        </Button>
        <div className="form__redirectLink-container">
          <Link to="/login"> Already have an account ? Sign in </Link>
        </div>
      </Stack>
    </form>
    // <Form>
    //   <Form.Group className="mb-3" controlId="registerForm-phoneNumber">
    //     <Form.Label className="form-label">
    //       Phone number
    //     </Form.Label>
    //     <Form.Control
    //       className="form-input"
    //       type="text"
    //       placeholder="Enter phone number"
    //     />
    //   </Form.Group>

    //   <Button
    //     className="form__submitBtn"
    //     variant="primary"
    //     type="submit"
    //   >
    //     Continue
    //   </Button>

    //   <div className="form__redirectLink-container">
    //     <Link to="/login"> Already have an account ? Sign in </Link>
    //   </div>
    // </Form>
  );
};
