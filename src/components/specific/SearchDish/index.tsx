import { SetStateAction, useEffect, useState } from "react";
import DishService from "~/services/dish/dishService";
import { useDispatch } from "react-redux";
import { searchDishes } from "~/store/dish/searchDishes/searchDishesAction";
import { clearSearchData } from "~/store/dish/searchDishes/searchDishesSlice";
import { SearchBar } from "~/components/common/SearchBar";

export const SearchDish = () => {

  const [productNameSuggestion, setProductNameSuggestion] = useState([])
  const [searchFormValue, setSearchFormValue] = useState("");
  const [suggestionBoxIsOpen, setSuggestionBoxIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleSubmitSearchProduct = (formData: any) => {
    const { keyword } = formData
    if(keyword.includes("&")){
        const modifiedKeyword = keyword.replace(/&/g, '%26');
        setSearchFormValue(modifiedKeyword)
        return
    }
    setSearchFormValue(keyword)
  }

  const handleOpenSuggestionBox = () => {
    setSuggestionBoxIsOpen(true)
  }

  const loadSuggestion = async (limit: number) => {

    const response: any = await DishService.getPopularDishes(limit);
    setProductNameSuggestion(response.data.map(((item: { dish: { name: any; }; }) => item.dish.name)));
  };


  useEffect(() => {
    // user clicked on a search input -> dropdown will open
    if (suggestionBoxIsOpen) {
      // if user not type anykeyword then (just click into input) -> fetch suggestion and load to suggestionBox
      if (!searchFormValue) {
        loadSuggestion(10);
      } else {
        //else if user start typing into search input
        const payload = { keyword: searchFormValue, limit: 10 }
        dispatch<any>(searchDishes(payload))
          .then((response: any) => {
            setProductNameSuggestion(response.payload.map(((item: { name: any; }) => item.name)));
          }).catch((error: { message: SetStateAction<string> }) => {
            console.log(error.message);
          });
      }
      if (!searchFormValue) {
        dispatch<any>(clearSearchData())
        console.log("search data is empty")
      }
    }


  }, [searchFormValue, suggestionBoxIsOpen])

  return (
      <SearchBar placeholder={`What do you want to eat today...`} dataSuggestion={productNameSuggestion} onSubmitSearchForm={handleSubmitSearchProduct} onOpenSuggestionBox={handleOpenSuggestionBox} />
  );
};

