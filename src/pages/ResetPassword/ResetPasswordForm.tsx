import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const ResetPasswordForm = () => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="resetPasswordForm-newPassword">
        <Form.Label className="form-label">Password</Form.Label>
        <Form.Control
          className="form-input"
          type="password"
          placeholder="Enter new password"
        />
      </Form.Group>

      <Form.Group
        className="mb-3"
        controlId="resetPasswordForm-newPasswordConfirm"
      >
        <Form.Label className="form-label">
          Confirm Password
        </Form.Label>
        <Form.Control
          className="form-input"
          type="password"
          placeholder="Enter password confirm"
        />
      </Form.Group>

      <Button
        className="form__submitBtn"
        variant="primary"
        type="submit"
      >
        Reset Password
      </Button>
    </Form>
  );
};
