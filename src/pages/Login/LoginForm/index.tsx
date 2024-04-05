import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import {
  Controller,
  FieldErrors,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchemaValidator from "./schema-validator";
import { InputField } from "../../../components/FormControl/InputField";

type LoginFormData = {
  phone: string;
  password: string;
};

type FieldName = "phone" | "password";

interface LoginFormProps {
  onSubmitLoginForm: (formData: LoginFormData) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmitLoginForm }) => {
  const form = useForm<LoginFormData>({
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const onSubmit = (formData: LoginFormData) => {
    onSubmitLoginForm(formData);
    form.reset();
  };

  return (
    <Form onSubmit={form.handleSubmit(onSubmit as SubmitHandler<FieldValues>)}>
      <Form.Group className="mb-3" controlId="loginForm-phoneNumber">
        <InputField name="phone" type="text" form={form} />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>

      <Form.Group
        style={{ float: "right", fontSize: "1.3rem" }}
        className="mb-3"
      >
        <Link to="/forgot-password">Forgot password?</Link>
      </Form.Group>
      <Button
        className="form__submitBtn"
        variant="primary"
        type="submit"
      >
        Sign in
      </Button>
      <div className="form__redirectLink-container">
        <Link to="/register">Don't have an account ? Sign up </Link>
      </div>
    </Form>
  );
};
