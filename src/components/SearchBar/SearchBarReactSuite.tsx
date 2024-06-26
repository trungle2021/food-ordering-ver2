import { Input, InputGroup } from 'rsuite';
import { SearchIcon } from '../UI/Icon';
import { debounce } from '~/utils/debounce';


interface SearchBarReactSuiteProps {
  placeholder: string;
  onSubmit: (dishName: string) => void;
  [key: string]: any; // To accept any other props dynamically
};



export const SearchBarReactSuite: React.FC<SearchBarReactSuiteProps> = ({ placeholder, onSubmit, ...props }) => {
  const handleInputChange = (dishName: string) => {
    onSubmit(dishName)
  }

  return (
    <InputGroup {...props}>
      <Input placeholder={placeholder} onChange={debounce(handleInputChange, 1000)}  />
      <InputGroup.Addon>
        <SearchIcon />
      </InputGroup.Addon>
    </InputGroup>
  )
}
