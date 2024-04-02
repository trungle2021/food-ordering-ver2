import React from "react";
import styles from "../AuthForms.module.css";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

export const ForgotPassword = () => {
  return (
    <div className={`${styles["wrapper-container"]}`}>
      <div className={styles["form"]}>
        <h1 className={styles["form-title"]}>Forgot Password</h1>
        <ForgotPasswordForm />
      </div>
    </div>
  );
};
