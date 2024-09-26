import { useState } from "react";
import { useDispatch } from "react-redux";
import { Alert } from "@mui/material";
import { LoginPayload } from "~/interface/auth/loginPayload";
import { LoginForm } from "~/components/specific/LoginForm";
import { OR } from "~/components/common/UI/OR";
import { Socials } from "~/components/common/UI/Socials";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "~/services/auth/authService";
import { loginUser } from "~/store/auth/authSlice";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [login, { data, error, isLoading }] = useLoginMutation();

  const handleSubmitLoginForm = async (values: LoginPayload) => {
    try {
        await login(values)
        const { accessToken, refreshToken, userId } = data;
        await dispatch<any>(loginUser({ accessToken, refreshToken, userId }));
      
    } catch (error: any) {
      setErrorMessage(error.data?.message || "An error occurred during login");
    }
  };

  return (
    <div className="wrapper-container">
      <div className="form">
        <h1 className="form-title">Sign in</h1>
        
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <LoginForm onSubmitLoginForm={handleSubmitLoginForm} isLoading={isLoading} />
        <OR text="OR" />
        <Socials />
      </div>
    </div>
  );
};
