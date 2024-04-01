import styles from "../AuthForms.module.css";
import { LoginForm } from "./LoginForm";
import { OR } from "../../../components/UI/OR/OR";
import { Socials } from "../../../components/UI/Socials/Socials";
import { useEffect, useState } from "react";
import AuthService from "../../../services/auth/auth-service";
import { LoginCredential } from '../../../interface/credential';


export const Login = () => {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formValues, setFormValues] = useState({
    'phone': '',
    'password': ''
  })
  const handleSubmitLoginForm = (values: any) => {
    setFormValues(values)
    setFormSubmitted(true)
  }

  useEffect(() => {
    async function fetchLoginApi () {
      const response = await AuthService.checkLogin(formValues)
      console.log(response.data)
    }
    if(formSubmitted) {
      fetchLoginApi()
    }
  }, [formSubmitted])
  return (
    <div className={`${styles["wrapper-container"]}`}>
      <div className={styles["form"]}>
        <h1 className={styles["form-title"]}>Sign in</h1>
        <LoginForm onSubmitLoginForm={handleSubmitLoginForm} />
        <OR text="OR" />
        <Socials />
      </div>
    </div>
  );
};
