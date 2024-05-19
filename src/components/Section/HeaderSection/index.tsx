import { useEffect, useState } from "react";
import { SearchBar } from "~/components/UI/SearchBar";
import styles from "./styles.module.css";
import DishService from "~/services/dish/dish-service";

export const HeaderSection = () => {

  const [productNameSuggestion, setProductNameSuggestion] = useState([])
  const [searchFormValue, setSearchFormValue] = useState("");
  const [suggestionBoxIsOpen, setSuggestionBoxIsOpen] = useState(false);

  const handleSubmitSearchProduct = (formData: any) => {
    const { keyword } = formData
    setSearchFormValue(keyword)
  }

  const handleOpenSuggestionBox = () => {
    setSuggestionBoxIsOpen(true)
  }

  const fetchPopularDishes = async (limit: number) => {
    
    const response: any = await DishService.fetchPopularDishes(limit);
    // console.log(response.data);
    setProductNameSuggestion(response.data.map(((item: { dish: { name: any; }; }) => item.dish.name)));
  };

  const fetchDishesByKeyword = async (keyword: string, limit: number) => {
    const response: any = await DishService.fetchDishesByName(keyword, limit)
    setProductNameSuggestion(response.data.map(((item: { name: any; }) => item.name)));
  }

  useEffect(() => {
    // user clicked on a search input -> dropdown will open
    if (suggestionBoxIsOpen) {
        // if user not type anykeyword then (just click into input) -> fetch suggestion and load to suggestionBox
      if (!searchFormValue) {
        console.log("searchFormValue is empty", searchFormValue)
        fetchPopularDishes(10);
      } else {
        console.log("searchFormValue has value", searchFormValue)
        //else if user start typing into search input
        fetchDishesByKeyword(searchFormValue, 10)
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

