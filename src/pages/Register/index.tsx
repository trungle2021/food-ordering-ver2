import { useDispatch } from "react-redux";
import { SetStateAction, useState } from "react";
import { useHistory } from "react-router-dom";
import { Alert } from "@mui/material";
import { getUserByUserId } from "~/store/User/userAction";
import { RegisterForm } from "~/components/specific/RegisterForm";
import { OR } from "~/components/common/UI/OR";
import { Socials } from "~/components/common/UI/Socials";
import { registerUser } from "~/store/auth/authAction";

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
        <Socials />
      </div>
    </div>
  );
};
