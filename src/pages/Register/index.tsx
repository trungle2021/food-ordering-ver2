import { useDispatch } from "react-redux";
import { SetStateAction, useState } from "react";
import { useHistory } from "react-router-dom";
import { Alert } from "@mui/material";
import { RegisterForm } from "~/components/specific/RegisterForm";
import { OR } from "~/components/common/UI/OR";
import { registerUser } from "~/store/auth/authAction";
import { getUserByUserId } from "~/store/user/userAction";

export const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmitRegisterForm = (formData: any) => {
    dispatch<any>(registerUser(formData))
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
  }

  return (
    <div className="wrapper-container">
      <div className="form">
        <h1 className="form-title">Sign up</h1>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <RegisterForm onSubmitRegisterForm={handleSubmitRegisterForm} />
        <OR text="OR" />
      </div>
    </div>
  );
};
