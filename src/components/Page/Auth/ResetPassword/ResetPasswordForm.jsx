import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "../AuthForms.module.css";
import { Link } from "react-router-dom";

export const ResetPasswordForm = () => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="resetPasswordForm-newPassword">
        <Form.Label className={`${styles["form-label"]}`}>Password</Form.Label>
        <Form.Control
          className={`${styles["form-input"]}`}
          type="password"
          placeholder="Enter new password"
        />
      </Form.Group>

      <Form.Group
        className="mb-3"
        controlId="resetPasswordForm-newPasswordConfirm"
      >
        <Form.Label className={`${styles["form-label"]}`}>
          Confirm Password
        </Form.Label>
        <Form.Control
          className={`${styles["form-input"]}`}
          type="password"
          placeholder="Enter password confirm"
        />
      </Form.Group>

      <Button
        className={`${styles["form__submitBtn"]}`}
        variant="primary"
        type="submit"
      >
        Reset Password
      </Button>
    </Form>
  );
};
