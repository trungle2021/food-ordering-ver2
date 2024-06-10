import { Link } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import  ForgotPasswordFormValidator  from "./forgot-password-validator";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { InputField } from '~/components/FormControls/InputField';

type ForgotPasswordFormValues = {
  email: string;
};

interface ForgotPasswordFormProps {
  onSubmitForgotPasswordForm: (formData: ForgotPasswordFormValues) => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSubmitForgotPasswordForm,
}) => {
  const { control, handleSubmit } = useForm<ForgotPasswordFormValues>({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(ForgotPasswordFormValidator),
  });

  const onSubmit = (formData: ForgotPasswordFormValues) => {
    onSubmitForgotPasswordForm(formData);
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
