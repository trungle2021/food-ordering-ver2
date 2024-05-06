import { SearchBar } from "~/components/UI/SearchBar";
import styles from "./styles.module.css";

export const HeaderSection = () => {
  return (
    <div className={`${styles["header-section"]}`}>
      <span className={`${styles["header-title"]}`}>Hello, Trung Le</span>
      <SearchBar placeholder={`What do you want to eat today...`} />
    </div>
  );
};
