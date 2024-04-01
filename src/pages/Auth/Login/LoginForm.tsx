import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "../AuthForms.module.css";
import { Link } from "react-router-dom";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import React from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import loginSchemaValidator from './loginSchemaValidator';

type LoginFormData = {
  phone: string,
  password: string,
};

interface LoginFormProps {
  onSubmitLoginForm: (formData: LoginFormData) => void;
}


export const LoginForm: React.FC<LoginFormProps> = ({ onSubmitLoginForm }) => {
  const { register, handleSubmit, formState: { errors }, trigger } = useForm<LoginFormData>({
    defaultValues: {
      phone: "",
      password: "",
    },
    resolver: yupResolver(loginSchemaValidator),
  });

  const onSubmit = (formData: LoginFormData) => {
    onSubmitLoginForm(formData)
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}>
      <Form.Group className="mb-3" controlId="loginForm-phoneNumber">

        <Form.Control
          {...register('phone')}
          className={`${styles["form-input"]}`}
          type="text"
          placeholder="Enter phone number"
          onBlur={() => trigger('phone')} // Trigger validation on blur event
          onChange={() => trigger('phone')} // Trigger validation on change event
        />
      {errors.phone && <p className="error-message">{errors.phone.message}</p>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="loginForm-password">
        <Form.Control
          {...register('password')}
          className={`${styles["form-input"]}`}
          type="password"
          placeholder="Password"
          onBlur={() => trigger('password')} // Trigger validation on blur event
          onChange={() => trigger('password')} // Trigger validation on change event
        />
        {errors.password && <p className="error-message">{errors.password.message}</p>}
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
