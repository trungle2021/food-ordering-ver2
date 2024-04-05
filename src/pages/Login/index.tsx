import { LoginForm } from "./LoginForm";
import { OR } from "../../components/UI/OR";
import { Socials } from "../../components/UI/Socials";
import { useEffect, useState } from "react";
import AuthService from "../../services/auth/auth-service";

export const Login = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formValues, setFormValues] = useState({
    phone: "",
    password: "",
  });
  const handleSubmitLoginForm = (values: any) => {
    console.log(values);
    setFormValues(values);
    // setFormSubmitted(true)
  };

  useEffect(() => {
    async function fetchLoginApi() {
      const response = await AuthService.checkLogin(formValues);
      console.log(response.data);
    }
    if (formSubmitted) {
      fetchLoginApi();
    }
  }, [formSubmitted]);
  return (
    <div className="wrapper-container">
      <div className="form">
        <h1 className="form-title">Sign in</h1>
        <LoginForm onSubmitLoginForm={handleSubmitLoginForm} />
        <OR text="OR" />
        <Socials />
      </div>
    </div>
  );
};
