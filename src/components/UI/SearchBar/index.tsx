import styles from "./styles.module.css";
import { useForm } from "react-hook-form";
import { InputField } from "~/components/Form-Controls/InputField";
import { Autocomplete, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";

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

export const SearchBar = ({ placeholder, onSubmitSearchForm, onOpenSuggestionBox, dataSuggestion }: SearchProps) => {

  const { handleSubmit, control, setValue } = useForm({
    mode: 'onTouched',
    defaultValues: initialFormValues,
  })

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
        onInputChange={(event, newValue) => {
          setValue('keyword', newValue);
          handleSubmit(onSubmit, onError)();
        }}
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
