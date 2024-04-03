import { SearchBar } from "../../components/UI/SearchBar";
import styles from "./style.module.css";

export const Favorites = () => {
  return (
    <>
      <h1>Favorites</h1>
      <div className={`${styles["searchbar-container"]}`}>
        <SearchBar placeholder={`What do you want eat today...`} />
      </div>
    </>
  );
};
