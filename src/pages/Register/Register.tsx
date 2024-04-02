import styles from "../AuthForms.module.css";
import { RegisterForm } from "./RegisterForm";
import { OR } from "../../../components/UI/OR/OR";
import { Socials } from "../../../components/UI/Socials/Socials";

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
