import { Input, InputGroup } from 'rsuite';
import { SearchIcon } from '../UI/Icon';
import { debounce } from '~/utils/debounce';
import { ChangeEventHandler } from 'react';


interface SearchBarReactSuiteProps {
  placeholder: string;
  onSubmit: (dishName: string) => void;
  [key: string]: any; // To accept any other props dynamically
};



export const SearchBarReactSuite: React.FC<SearchBarReactSuiteProps> = ({ placeholder, onSubmit, ...props }) => {
  const handleInputChange = (dishName: string) => {
    onSubmit(dishName)
  }
  const debouncedOnChange = debounce(handleInputChange, 1000)

  return (
    <InputGroup {...props}>
      <Input placeholder={placeholder} onChange={debouncedOnChange }  />
      <InputGroup.Addon>
        <SearchIcon />
      </InputGroup.Addon>
    </InputGroup>
  )
}
