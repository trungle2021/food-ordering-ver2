import { SetStateAction, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginForm } from "./LoginForm";
import { OR } from "~/components/UI/OR";
import { Socials } from "~/components/UI/Socials";
import { LoginPayload } from "../../../interface/auth/login-payload";
import { Alert } from "@mui/material";
import { loginUser } from "../authAction";

export const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");


  const handleSubmitLoginForm = (values: LoginPayload) => {
    try {
      dispatch<any>(loginUser(values))
        .then((result: any) => {
          if (result.payload.status === "success") {
            history.push('/dashboard');
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
        <Socials />
      </div>
    </div>
  );
};
