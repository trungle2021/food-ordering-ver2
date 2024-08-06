import styles from "./styles.module.css";
import { useForm } from "react-hook-form";
import { Autocomplete, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";
import { debounce } from "~/utils/debounce";
import { InputField } from "../FormControls/InputField";


type SearchProps = {
    placeholder?: string;
    onSubmitSearchForm: (formData: SearchFormValues) => void;
    onOpenSuggestionBox?: () => void;
    dataSuggestion?: Array<any>;
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

    const handleInputChange = (event: React.ChangeEvent<{}>, newValue: string | null) => {
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
        <form className={`${styles["form-search"]}`} onSubmit={(e) => {
            e.preventDefault();
        }}>
            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                options={dataSuggestion ? dataSuggestion : []}
                onOpen={onOpenSuggestionBox ? onOpenSuggestionBox : () => { }}
                onInputChange={debounce(handleInputChange, 500)}
                renderInput={(params) => (
                    <InputField
                        name="keyword"
                        type="text"
                        placeholder={placeholder}
                        {...params}
                        control={control}
                        InputProps={{
                            ...params.InputProps,
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

