import React from "react";
import styles from "../AuthForms.module.css";
import { ResetPasswordForm } from "./ResetPasswordForm";

export const ResetPassword = () => {
  return (
    <div className={`${styles["wrapper-container"]}`}>
      <div className={styles["form"]}>
        <h1 className={styles["form-title"]}>Reset Password</h1>
        <ResetPasswordForm />
      </div>
    </div>
  );
};
