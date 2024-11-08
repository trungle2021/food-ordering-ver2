import { SetStateAction, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Alert } from "@mui/material";
import { LoginPayload } from "~/interface/auth/loginPayload";
import { LoginForm } from "~/components/specific/LoginForm";
import { OR } from "~/components/common/UI/OR";
import { loginUser } from "~/store/auth/authAction";
import { getUserByUserId } from "~/store/user/userAction";
import { GoogleLogin } from "@react-oauth/google";
import AuthService from "~/services/auth/authService";

export const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");

  const handleOnLoginOAuthSuccess = async (credentialResponse: any, resourceType: string) => {
    const token = credentialResponse.credential
    // send token to backend. 
    try {
      const response = await AuthService.loginOAuth(resourceType, token);
      const 
    }
  }

  const handleOnLoginOAuthFailed = () => {

  }

  const handleSubmitLoginForm = (values: LoginPayload) => {
    try {
      dispatch<any>(loginUser(values))
        .then((result: any) => {
          if (result.payload.status === "success") {
            dispatch<any>(getUserByUserId(result.payload.data.userId)).then((result: any) => {
              history.push('/dashboard');
            });
          } else {
            setErrorMessage(result.payload.message)
          }
        })
        .catch((error: { message: SetStateAction<string> }) => {
          setErrorMessage(error.message);
        });
    } catch (error: any) { }
  };

  return (
    
    <div className="wrapper-container">
          
      <div className="form">
        <h1 className="form-title">Sign in</h1>
        
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <LoginForm onSubmitLoginForm={handleSubmitLoginForm} />
        <OR text="OR" />
        <div>
          <GoogleLogin
            onSuccess={handleOnLoginOAuthSuccess}
            onError={handleOnLoginOAuthFailed}
            useOneTap
        />;
          </div>
      </div>
    </div>
  );
};
