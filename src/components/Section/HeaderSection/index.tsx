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

    const fetchDishesByKeyword = async (keyword: string) => {
      const response: any = await DishService.fetchDishesByName(keyword)
      setProductNameSuggestion(response.data.map(((item: { name: any; }) => item.name)));
    }

    const fetchDishesByOneLetterKeyword = async (keyword: string) => {
    }

    // user clicked on a search input -> dropdown will open
    if (suggestionBoxIsOpen) {
      // if user not type anykeyword then (just click into input) -> fetch suggestion and load to suggestionBox
      if (!searchFormValue) {
        fetchPopularDishes();
      } else {
      //else if user start typing into search input
      // if user type 1 letter keyword only and submit -> call api search with regex search strategy
        if(searchFormValue.length == 1) {
          fetchDishesByOneLetterKeyword(searchFormValue);
        }else{
      // else if more than 1 letter -> call api search with full text search strategy
          (fetchDishesByKeyword(searchFormValue));
        }
       
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