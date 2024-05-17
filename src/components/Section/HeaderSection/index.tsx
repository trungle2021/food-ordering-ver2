import { useEffect, useState } from "react";
import { SearchBar } from "~/components/UI/SearchBar";
import styles from "./styles.module.css";
import DishService from "~/services/dish/dish-service";

export const HeaderSection = () => {

  const [productNameSuggestion, setProductNameSuggestion] = useState([])
  const [searchFormValue, setSearchFormValue] = useState("");
  const [suggestionBoxIsOpen, setSuggestionBoxIsOpen] = useState(false);
  const handleSubmitSearchProduct = (formData: any) => {
    const { productName } = formData
    setSearchFormValue(productName)
  }

  const handleOpenSuggestionBox = () => {
    setSuggestionBoxIsOpen(true)
  }

  useEffect(() => {
    const fetchPopularDishes = async () => {
      const response: any = await DishService.fetchPopularDishes(10);
      // console.log(response.data);
      setProductNameSuggestion(response.data.map(((item: { dish: { name: any; }; }) => item.dish.name)));
    };

    const fetchDishesByKeyword = async () => {
      const response: any = await DishService.fetchDishesByName(searchFormValue)
      setProductNameSuggestion(response.data.map(((item: { name: any; }) => item.name)));
    }

    if (suggestionBoxIsOpen) {
      if (!searchFormValue) {
        fetchPopularDishes();
      } else {
        fetchDishesByKeyword();
      }
    }

  }, [searchFormValue, suggestionBoxIsOpen])

  return (
    <div className={`${styles["header-section"]}`}>
      <span className={`${styles["header-title"]}`}>Hello, Trung Le</span>
      <SearchBar placeholder={`What do you want to eat today...`} dataSuggestion={productNameSuggestion} onSubmitSearchForm={handleSubmitSearchProduct} onOpenSuggestionBox={handleOpenSuggestionBox} />
    </div>
  );
};


// const searchDishByName = (name: string) => {
//   const response: any = DishService.fetchDishesByName(name)
//   setProductNameSuggestion(response.data)
// }