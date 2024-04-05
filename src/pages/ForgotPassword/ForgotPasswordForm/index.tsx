import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const ForgotPasswordForm = () => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="forgotPasswordForm-phoneNumber">
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
    </Form>
  );
};
