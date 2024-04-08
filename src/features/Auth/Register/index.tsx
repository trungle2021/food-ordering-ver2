import { RegisterForm } from "./RegisterForm";
import { OR } from "../../components/UI/OR";
import { Socials } from "../../components/UI/Socials";

export const Register = () => {
  const handleSubmitRegisterForm = (formData: any) => {};
  return (
    <div className="wrapper-container">
      <div className="form">
        <h1 className="form-title">Sign up</h1>
        <RegisterForm onSubmitRegisterForm={handleSubmitRegisterForm} />
        <OR text="OR" />
        <Socials />
      </div>
    </div>
  );
};
