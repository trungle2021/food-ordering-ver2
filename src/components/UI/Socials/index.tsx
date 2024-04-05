import styles from "./styles.module.css";
import Button from "react-bootstrap/Button";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export const Socials = () => {
  return (
    <div className={`${styles["login-social"]}`}>
      <Button variant="outline-secondary" className={`${styles["socialBtn"]}`}>
        <FaFacebook color="#4267B2" /> Facebook
      </Button>{" "}
      <Button variant="outline-secondary" className={`${styles["socialBtn"]}`}>
        <FcGoogle /> Google
      </Button>{" "}
    </div>
  );
};
