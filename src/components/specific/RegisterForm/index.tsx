import { Link } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import RegisterFormValidator from './register-form-validator'
import { InputField } from "~/components/common/FormControls/InputField";

type RegisterFormValues = {
  email: string;
  password: string;
  cpassword: string;
  phone: string;
  name: string;
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
      password: "",
      cpassword: "",
      name: "",
      phone: "",
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

        <InputField
          label="Password"
          name="password"
          type="password"
          control={control}
        />

        <InputField
          label="Confirm Password"
          name="cpassword"
          type="password"
          control={control}
        />

        <InputField
          label="Full Name"
          name="name"
          type="text"
          control={control}
        />

        <InputField
          label="Phone Number"
          name="phone"
          type="text"
          control={control}
        />


        <Button type="button" variant="contained" color="primary">
          Continue
        </Button>
        <div className="form__redirectLink-container">
          <Link to="/login"> Already have an account ? Sign in </Link>
        </div>
      </Stack>
    </form>
  );
};
