import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "../AuthForms.module.css";
import { Link } from "react-router-dom";
export const LoginForm = () => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="loginForm-phoneNumber">
        <Form.Label className={`${styles["form-label"]}`}>
          Phone number
        </Form.Label>
        <Form.Control
          className={`${styles["form-input"]}`}
          type="text"
          placeholder="Enter phone number"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="loginForm-password">
        <Form.Label className={`${styles["form-label"]}`}>Password</Form.Label>
        <Form.Control
          className={`${styles["form-input"]}`}
          type="password"
          placeholder="Password"
        />
      </Form.Group>

      <Form.Group
        style={{ float: "left", fontSize: "1.3rem" }}
        className="mb-3"
        controlId="formBasicCheckbox"
      >
        <Form.Check type="checkbox" label="Remember me" />
      </Form.Group>

      <Form.Group
        style={{ float: "right", fontSize: "1.3rem" }}
        className="mb-3"
      >
        <Link to="/forgot-password">Forgot password?</Link>
      </Form.Group>

      <Button
        className={`${styles["form__submitBtn"]}`}
        variant="primary"
        type="submit"
      >
        Sign in
      </Button>

      <div className={styles["form__redirectLink-container"]}>
        <Link to="/register">Don't have an account ? Sign up </Link>
      </div>
    </Form>
  );
};
