import { SearchBar } from "../../UI/SearchBar";
import styles from "./HeaderSection.module.css";

export const HeaderSection = () => {
  return (
    <div className={`${styles["header-section"]}`}>
      <span className={`${styles["header-title"]}`}>Hello, Trung Le</span>
      <SearchBar placeholder={`What do you want eat today...`} />
    </div>
  );
};
