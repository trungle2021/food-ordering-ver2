import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoginForm } from "./LoginForm";
import { OR } from "~/components/UI/OR";
import { Socials } from "~/components/UI/Socials";
import AuthService from "~/services/auth/auth-service";
import { login } from "../authSlice";

export const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmitLoginForm = (values: any) => {
    setFormValues(values);
    setFormSubmitted(true);
  };

  const handleLoginResponse = (response: any) => {
    const { user, accessToken, refreshToken } = response;

    if (user && accessToken && refreshToken) {
      console.log("Login success");
      dispatch(login(response));
      history.push("/dashboard");
    } else {
      console.log("Login failed");
    }
  };

  async function fetchLoginApi() {
    try {
      const response = await AuthService.checkLogin(formValues);
      handleLoginResponse(response.data);
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error?.message);
    }
  }

  useEffect(() => {
    if (formSubmitted) {
      fetchLoginApi();
    }
  }, [formSubmitted, dispatch]);
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
