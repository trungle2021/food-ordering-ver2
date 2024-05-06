import styles from "./styles.module.css";
import { SearchIcon } from "../Icon";
import { useForm } from "react-hook-form";
import { InputField } from "~/components/Form-Controls/InputField";

type SearchProps = {};
export const SearchBar = ({ placeholder }: { placeholder: string }) => {
  const {register, control} = useForm()
  return (
    <form className={`${styles["form-search"]}`}>
      <SearchIcon className={`${styles["search-icon"]}`} />
      {/* <input
        type="text"
        placeholder={placeholder}
        className={`${styles["search-bar"]}`}
      /> */}
      <InputField 
        name = "search-dish"
        type="text"
        placeholder={placeholder}
        control={control}
        style={{ paddingLeft: '40px', height: '100%', width: '100%', borderRadius: '30px' }}
      />
    </form>
  );
};
