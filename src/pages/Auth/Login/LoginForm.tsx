import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "../AuthForms.module.css";
import { Link } from "react-router-dom";
import {
  FieldErrors,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchemaValidator from "./loginSchemaValidator";

type LoginFormData = {
  phone: string;
  password: string;
};

type FieldName = "phone" | "password";

interface LoginFormProps {
  onSubmitLoginForm: (formData: LoginFormData) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmitLoginForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm<LoginFormData>({
    defaultValues: {
      phone: "",
      password: "",
    },
    resolver: yupResolver(loginSchemaValidator),
  });

  const [errorMessages, setErrorMessages] = React.useState({});

  const handleInputChange = async (fieldName: FieldName) => {
    await trigger(fieldName);
    setErrorMessages((prev) => {
      return {
        ...prev,
        [fieldName]: errors[fieldName],
      };
    });
  };

  const onSubmit = (formData: LoginFormData) => {
    onSubmitLoginForm(formData);
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}>
      <Form.Group className="mb-3" controlId="loginForm-phoneNumber">
        <Form.Control
          {...register("phone")}
          className={`${styles["form-input"]}`}
          type="text"
          placeholder="Enter phone number"
          onChange={() => handleInputChange("phone")} // Trigger validation on change event
        />
        {errors?.phone && (
          <p className="error-message">{errors.phone.message}</p>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="loginForm-password">
        <Form.Control
          {...register("password")}
          className={`${styles["form-input"]}`}
          type="password"
          placeholder="Password"
          onKeyUp={() => handleInputChange("password")} // Trigger validation on change event
        />
        {errorMessages?.password && (
          <p className="error-message">{errorMessages.password.message}</p>
        )}
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
