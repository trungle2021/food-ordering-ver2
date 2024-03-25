import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "../AuthForms.module.css";
import { Link } from "react-router-dom";
import { MouseEventHandler, useEffect } from "react";
import AuthService from "../../../services/auth/auth-service";

export const LoginForm = () => {
  const handleSubmitLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // AuthService.checkLogin();
    useEffect(() => {}, []);
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="loginForm-phoneNumber">
        <Form.Control
          className={`${styles["form-input"]}`}
          type="text"
          placeholder="Enter phone number"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="loginForm-password">
        <Form.Control
          className={`${styles["form-input"]}`}
          type="password"
          placeholder="Password"
        />
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
        onClick={() => handleSubmitLogin}
      >
        Sign in
      </Button>

      <div className={styles["form__redirectLink-container"]}>
        <Link to="/register">Don't have an account ? Sign up </Link>
      </div>
    </Form>
  );
};
