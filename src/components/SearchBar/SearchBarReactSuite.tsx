import { Input, InputGroup } from 'rsuite';
import { SearchIcon } from '../UI/Icon';
import { useEffect, useRef, useState } from 'react';


interface SearchBarReactSuiteProps {
    value: any;
    placeholder: string;
    focusOnReload: boolean;
    onSubmit: (dishName: string) => void;
    [key: string]: any; // To accept any other props dynamically
};


export const SearchBarReactSuite: React.FC<SearchBarReactSuiteProps> = ({ value, focusOnReload, placeholder, onSubmit, ...props }) => {
    const [inputValue, setInputValue] = useState(value)
    const inputRef = useRef<HTMLInputElement>(null)
    const handleInputChange = (value: string, event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(value)
        onSubmit(value)
    }

    useEffect(() => {
        // Focus the input element when the component mounts
        if(inputValue && inputValue.trim() !== '' && focusOnReload){
            inputRef.current?.focus();
        }
    }, []);

    return (
        <InputGroup {...props}>
            <Input ref={inputRef} value={inputValue} placeholder={placeholder} onChange={(value, event) => handleInputChange(value, event)} />
            <InputGroup.Addon>
                <SearchIcon />
            </InputGroup.Addon>
        </InputGroup>
    )
}
