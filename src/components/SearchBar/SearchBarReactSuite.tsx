import { Input, InputGroup } from 'rsuite';
import { SearchIcon } from '../UI/Icon';
import { Interface } from 'readline/promises';


interface SearchBarReactSuiteProps {
    placeholder: string;
    [key: string]: any; // To accept any other props dynamically
  };
  
  export const SearchBarReactSuite: React.FC<SearchBarReactSuiteProps> = ({ placeholder, ...props }) => (
    <InputGroup {...props}>
      <Input placeholder={placeholder} />
      <InputGroup.Addon>
        <SearchIcon />
      </InputGroup.Addon>
    </InputGroup>
  );