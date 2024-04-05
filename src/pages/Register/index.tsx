import { RegisterForm } from "./RegisterForm";
import { OR } from "../../components/UI/OR";
import { Socials } from "../../components/UI/Socials";

export const Register = () => {
  return (
    <div className="wrapper-container">
      <div className="form">
        <h1 className="form-title">Sign up</h1>
        <RegisterForm />
        <OR text="OR" />
        <Socials />
      </div>
    </div>
  );
};
