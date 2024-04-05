import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

export const RegisterForm = () => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="registerForm-phoneNumber">
        <Form.Label className="form-label">
          Phone number
        </Form.Label>
        <Form.Control
          className="form-input"
          type="text"
          placeholder="Enter phone number"
        />
      </Form.Group>

      <Button
        className="form__submitBtn"
        variant="primary"
        type="submit"
      >
        Continue
      </Button>

      <div className="form__redirectLink-container">
        <Link to="/login"> Already have an account ? Sign in </Link>
      </div>
    </Form>
  );
};
