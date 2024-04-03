import styles from "./SearchBar.module.css";
import { SearchIcon } from "../Icon/Icon";

type SearchProps = {};
export const SearchBar = ({ placeholder }: { placeholder: string }) => {
  return (
    <form className={`${styles["form-search"]}`}>
      <SearchIcon className={`${styles["search-icon"]}`} />
      <input
        type="text"
        placeholder={placeholder}
        className={`${styles["search-bar"]}`}
      />
    </form>
  );
};
