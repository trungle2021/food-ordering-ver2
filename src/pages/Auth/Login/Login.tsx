import styles from "../AuthForms.module.css";
import { LoginForm } from "./LoginForm";
import { OR } from "../../../components/UI/OR/OR";
import { Socials } from "../../../components/UI/Socials/Socials";

export const Login = () => {
  return (
    <div className={`${styles["wrapper-container"]}`}>
      <div className={styles["form"]}>
        <h1 className={styles["form-title"]}>Sign in</h1>

        <LoginForm />
        <OR text="OR" />
        <Socials />
      </div>
    </div>
  );
};
