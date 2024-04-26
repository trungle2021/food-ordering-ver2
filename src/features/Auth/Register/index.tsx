import { useDispatch } from "react-redux";
import { RegisterForm } from "./RegisterForm";
import { OR } from "~/components/UI/OR";
import { Socials } from "~/components/UI/Socials";
import { registerUser } from "../authSlice";
import { SetStateAction, useState } from "react";
import { useHistory } from "react-router-dom";
import { Alert } from "@mui/material";

export const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");
 
  const handleSubmitRegisterForm = (formData: any) => {
    dispatch<any>(registerUser(formData))
      .then((result: any) => {
        if (result.payload.status === "success") {
          history.push('/dashboard');
        }else{
          setErrorMessage(result.payload.message)
        }
      })
      .catch((error: { message: SetStateAction<string> }) => {
        setErrorMessage(error.message);
      });
  }

  return (
    <div className="wrapper-container">
      <div className="form">
        <h1 className="form-title">Sign up</h1>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <RegisterForm onSubmitRegisterForm={handleSubmitRegisterForm} />
        <OR text="OR" />
        <Socials />
      </div>
    </div>
  );
};
