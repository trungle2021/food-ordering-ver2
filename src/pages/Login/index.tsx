import { LoginForm } from "./LoginForm";
import { OR } from "../../components/UI/OR";
import { Socials } from "../../components/UI/Socials";
import { useEffect, useState } from "react";
import AuthService from "../../services/auth/auth-service";
import { useHistory } from "react-router-dom";

export const Login = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const handleSubmitLoginForm = (values: any) => {
    setFormValues(values);
    setFormSubmitted(true)
  };

  const handleLoginResponse = (response: any) => {
    if (response?.accessToken && response?.refreshToken){
      console.log("Login success");
      history.push("/dashboard");
    }else{
      console.log("Login failed");
    }
  }

  async function fetchLoginApi() {
    try {
      const response = await AuthService.checkLogin(formValues);
      handleLoginResponse(response.data)

    } catch (error: any) {
      console.log(error)
      setErrorMessage(error?.message);
    }
  }

  useEffect(() => {
    if (formSubmitted) {
      fetchLoginApi();
    }
  }, [formSubmitted]);
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
