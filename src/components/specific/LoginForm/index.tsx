import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchemaValidator from "./login-validator";
import { Button, Stack } from "@mui/material";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import { InputField } from "~/components/common/FormControls/InputField";

interface LoginFormProps {
  onSubmitLoginForm: (formData: LoginFormValues) => void;
}

type LoginFormValues = {
  email: string;
  password: string;
  // rememberMe?: boolean;
};

const initialFormValues: LoginFormValues = {
  email: "",
  password: "",
  // rememberMe: false
};

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmitLoginForm }) => {
  const { status } = useSelector((state: any) => state.auth)

  const {
    handleSubmit,
    reset,
    control,
  } = useForm<LoginFormValues>({
    mode: "onTouched",
    defaultValues: initialFormValues,
    resolver: yupResolver(loginSchemaValidator),
  });

  const onSubmit = (formData: LoginFormValues) => {
    onSubmitLoginForm(formData);
    //if credentials not valid, still hold current data in input
    if (status === 'success') reset()
  };

  const onError = (error: any) => {
    console.log("ERROR:::", error);
  };

  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit, onError)}>
        <Stack spacing={2} width={400}>
          <InputField
            label="Email"
            name="email"
            type="text"
            control={control}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            control={control}
          />
          <div className={`${styles["login-form__function"]}`}>
            {/* <CheckBoxField
              label="Remember me"
              name="rememberMe"
              control={control}
            /> */}
            <Link to="/forgot-password">Forgot password ?</Link>
          </div>
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
