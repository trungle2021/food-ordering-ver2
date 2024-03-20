import React from "react";
import styles from "../AuthForms.module.css";
import { RegisterForm } from "./RegisterForm";
import { OR } from "../../../UI/OR/OR";
import { Socials } from "../Socials/Socials";

export const Register = () => {
  return (
    <div className={`${styles["wrapper-container"]}`}>
      <div className={styles["form"]}>
        <h1 className={styles["form-title"]}>Sign up</h1>
        <RegisterForm />
        <OR text="OR" />
        <Socials />
      </div>
    </div>
  );
};
