import { Link } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import { InputField } from "../../../components/Form-Controls/InputField";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";

type ForgotPasswordFormValues = {
  phone: string;
};

interface ForgotPasswordFormProps {
  onSubmitForgotPasswordForm: (formData: ForgotPasswordFormValues) => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSubmitForgotPasswordForm,
}) => {
  const { control, handleSubmit } = useForm<ForgotPasswordFormValues>({
    defaultValues: {
      phone: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        phone: yup
          .string()
          .min(10, "Phone number must be at least 10 characters")
          .max(15, "Phone number must not exceed 15 characters")
          .required("Phone number is required"),
      })
    ),
  });

  const onSubmit = (formData: ForgotPasswordFormValues) => {
    onSubmitForgotPasswordForm(formData);
  };
  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} width={400}>
        <InputField
          label="Phone Number"
          name="phone"
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
