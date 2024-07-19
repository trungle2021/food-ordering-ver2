import { SetStateAction, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginForm } from "./LoginForm";
import { OR } from "~/components/UI/OR";
import { Socials } from "~/components/UI/Socials";
import { LoginPayload } from "../../../interface/auth/loginPayload";
import { Alert, Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { loginUser } from "../authAction";
import { updateBalance } from "~/features/Balance/balanceSlice";
import { getBalance } from "~/features/Balance/balanceAction";
import { getUserByUserId } from "~/features/User/userAction";

export const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");


  const handleSubmitLoginForm = (values: LoginPayload) => {
    try {
      dispatch<any>(loginUser(values))
        .then((result: any) => {
          if (result.payload.status === "success") {
            dispatch<any>(getUserByUserId(result.payload.data.userId));
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
