import { ForgotPasswordForm } from "~/components/specific/ForgotPasswordForm";

export const ForgotPassword = () => {
  const handleOnSubmitForgotPasswordForm = (data: any) => {
    
  }
  return (
    <div className="wrapper-container">
      <div className="form">
        <h1 className="form-title">Forgot Password</h1>
        <ForgotPasswordForm onSubmitForgotPasswordForm={handleOnSubmitForgotPasswordForm}/>
      </div>
    </div>
  );
};
