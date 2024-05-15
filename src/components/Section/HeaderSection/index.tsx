import { SearchBar } from "~/components/UI/SearchBar";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";

export const HeaderSection = () => {

  const [productNameSuggestion, setProductNameSuggestion] = useState([])
  useEffect(() => {
    const productNameSuggestion = 
  })
  const handleSubmitSearchProduct = (formData: any) => {
    console.log("formData", formData);
  }
  return (
    <div className={`${styles["header-section"]}`}>
      <span className={`${styles["header-title"]}`}>Hello, Trung Le</span>
      <SearchBar placeholder={`What do you want to eat today...`} onSubmitSearchForm={handleSubmitSearchProduct} />
    </div>
  );
};
