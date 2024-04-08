import { Link } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import { InputField } from "../../../components/Form-Controls/InputField";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import RegisterFormValidator from './register-form-validator'

type RegisterFormValues = {
  email: string;
};

interface RegisterFormProps {
  onSubmitRegisterForm: (formData: RegisterFormValues) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmitRegisterForm,
}) => {
  const { control, handleSubmit } = useForm<RegisterFormValues>({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(
      RegisterFormValidator
    ),
  });

  const onSubmit = (formData: RegisterFormValues) => {
    onSubmitRegisterForm(formData);
  };
  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} width={400}>
        <InputField
          label="Email"
          name="email"
          type="text"
          control={control}
        />
        <Button type="submit" variant="contained" color="primary">
          Continue
        </Button>
        <div className="form__redirectLink-container">
          <Link to="/login"> Already have an account ? Sign in </Link>
        </div>
      </Stack>
    </form>
  );
};
