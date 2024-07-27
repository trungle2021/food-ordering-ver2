import styles from "./styles.module.css";
export const OR = ({ text }: {text: string}) => {
  return (
    <div className={`${styles["OR-container"]}`}>
      <div className="line-thin"></div>
      <span>{text}</span>
      <div className="line-thin"></div>
    </div>
  );
};
