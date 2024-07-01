import { Input, InputGroup } from 'rsuite';
import { SearchIcon } from '../UI/Icon';
import { useState } from 'react';


interface SearchBarReactSuiteProps {
    value: any;
    placeholder: string;
    onSubmit: (dishName: string) => void;
    [key: string]: any; // To accept any other props dynamically
};


export const SearchBarReactSuite: React.FC<SearchBarReactSuiteProps> = ({ value, placeholder, onSubmit, ...props }) => {
    const [inputValue, setInputValue] = useState(value)

    const handleInputChange = (value: string, event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(value)
        onSubmit(value)
    }
    return (
        <InputGroup {...props}>
            <Input value={inputValue} placeholder={placeholder} onChange={(value, event) => handleInputChange(value, event)} />
            <InputGroup.Addon>
                <SearchIcon />
            </InputGroup.Addon>
        </InputGroup>
    )
}
