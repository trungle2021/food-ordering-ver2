import { SetStateAction, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoginForm } from "./LoginForm";
import { OR } from "~/components/UI/OR";
import { Socials } from "~/components/UI/Socials";
import { loginUser } from "../authSlice";
import { LoginPayload } from '../../../interface/LoginPayload';
import { unwrapResult } from "@reduxjs/toolkit";

export const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");


  const handleSubmitLoginForm = (values: LoginPayload) => {
    try {
       dispatch<any>(loginUser(values))
      .then((response: any) => {
        history.push("/dashboard");
      })
      .catch((error: { message: SetStateAction<string>; }) => {
        setErrorMessage(error.message);
      });

    } catch (error: any) {
      
    }
  };

  return (
    <div className="wrapper-container">
      <div className="form">
        <h1 className="form-title">Sign in</h1>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <LoginForm onSubmitLoginForm={handleSubmitLoginForm} />
        <OR text="OR" />
        <Socials />
      </div>
    </div>
  );
};
