import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchemaValidator from "./schema-validator";
import { TextField, Button, Stack } from "@mui/material";

interface LoginFormProps {
  onSubmitLoginForm: (formData: LoginFormValues) => void;
}

type LoginFormValues = {
  phone: string;
  password: string;
};

const initialFormValues: LoginFormValues = {
  phone: "",
  password: "",
};

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmitLoginForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<LoginFormValues>({
    mode: "onTouched",
    defaultValues: initialFormValues,
    resolver: yupResolver(loginSchemaValidator),
  });

  const onSubmit = (formData: LoginFormValues) => {
    console.log(formData);
    onSubmitLoginForm(formData);
    reset();
  };

  const onError = (error: any) => {
    console.log("ERROR:::", error);
  };

  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit, onError)}>
        <Stack spacing={2} width={400}>
          <TextField type="text" name="phone" label="Phone number" />
          <TextField type="text" name="password" label="Password" />
          <Button type="submit" variant="contained" color="primary">
            Sign in
          </Button>
          <div className="form__redirectLink-container">
            <Link to="/register">Don't have an account ? Sign up </Link>
          </div>
        </Stack>
      </form>
    </>
  );
};

// return (
//   <Form noValidate onSubmit={handleSubmit(onSubmit, onError)}>
//     <Form.Group className="mb-3" controlId="loginForm-phone">
//       <Form.Label>Phone number</Form.Label>
//       <Form.Control {...register("phone")} type="text" />
//       {errors.phone && (
//         <Form.Control.Feedback type="invalid">
//           {errors.phone?.message}
//         </Form.Control.Feedback>
//       )}
//       <Form.Control.Feedback type="invalid">
//         {errors.phone?.message}
//       </Form.Control.Feedback>
//     </Form.Group>

//     <Form.Group className="mb-3" controlId="loginForm-password">
//       <Form.Label>Password</Form.Label>
//       <Form.Control {...register("password")} type="password" />
//       {errors.password && (
//         <Form.Control.Feedback type="invalid">
//           {errors.password?.message}
//         </Form.Control.Feedback>
//       )}
//     </Form.Group>

//     <Form.Group
//       style={{ float: "right", fontSize: "1.3rem" }}
//       className="mb-3"
//     >
//       <Link to="/forgot-password">Forgot password?</Link>
//     </Form.Group>
//     <Button className="form__submitBtn" variant="primary" type="submit">
//       Sign in
//     </Button>
//     <div className="form__redirectLink-container">
//       <Link to="/register">Don't have an account ? Sign up </Link>
//     </div>
//   </Form>
// );
