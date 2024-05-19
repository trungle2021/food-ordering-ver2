import { useEffect, useState } from "react";
import { SearchBar } from "~/components/UI/SearchBar";
import styles from "./styles.module.css";
import DishService from "~/services/dish/dish-service";
import { Autocomplete, InputAdornment } from "@mui/material";
import { debounce } from "~/utils/debounce";
import { InputField } from "~/components/Form-Controls/InputField";
import { Search } from "~/components/UI/Icon";
import { useForm } from "react-hook-form";


type SearchProps = {
  placeholder?: string;
  onSubmitSearchForm: (formData: SearchFormValues) => void;
  onOpenSuggestionBox: () => void;
  dataSuggestion: Array<any>;
};

type SearchFormValues = {
  keyword: string;
};

const initialFormValues: SearchFormValues = {
  keyword: "",
};

export const SearchDish = ({ placeholder, onSubmitSearchForm, onOpenSuggestionBox, dataSuggestion }: SearchProps) => {

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


  const { handleSubmit, control, setValue } = useForm({
    mode: 'onTouched',
    defaultValues: initialFormValues,
  })

  const onInputChange = (event: React.ChangeEvent<{}>, newValue: string | null) => {
      const keyword = newValue == null ? "" : newValue
      setValue('keyword', keyword);
      handleSubmit(onSubmit, onError)();
  };

  const onSubmit = (formData: SearchFormValues) => {
    onSubmitSearchForm(formData);
  };

  const onError = (error: any) => {
    console.log("ERROR:::", error);
  };

  return (
    <form className={`${styles["form-search"]}`} >
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={dataSuggestion}
        onOpen={onOpenSuggestionBox}
        onInputChange={debounce(onInputChange, 500)}
        renderInput={(params) => (
          <InputField
            name="keyword"
            type="text"
            placeholder={placeholder}
            {...params}
            label="Search input"
            control={control}
            InputProps={{
              ...params.InputProps, // spread params.InputProps here
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </form>
  );
};


  // return (
  //   <div className={`${styles["header-section"]}`}>
  //     <span className={`${styles["header-title"]}`}>Hello, Trung Le</span>
  //     <SearchBar placeholder={`What do you want to eat today...`} dataSuggestion={productNameSuggestion} onSubmitSearchForm={handleSubmitSearchProduct} onOpenSuggestionBox={handleOpenSuggestionBox} />
  //   </div>
  // );