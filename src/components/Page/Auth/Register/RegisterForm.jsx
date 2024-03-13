import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "../AuthForms.module.css";
import { Link } from "react-router-dom";

export const RegisterForm = () => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="registerForm-phoneNumber">
        <Form.Label className={`${styles["form-label"]}`}>
          Phone number
        </Form.Label>
        <Form.Control
          className={`${styles["form-input"]}`}
          type="text"
          placeholder="Enter phone number"
        />
      </Form.Group>

      <Button
        className={`${styles["form__submitBtn"]}`}
        variant="primary"
        type="submit"
      >
        Continue
      </Button>

      <div className={styles["form__redirectLink-container"]}>
        <Link to="/login"> Already have an account ? Sign in </Link>
      </div>
    </Form>
  );
};
