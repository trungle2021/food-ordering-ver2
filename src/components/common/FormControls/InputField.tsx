import { TextField, TextFieldProps } from "@mui/material";
import { Control, Controller, RegisterOptions } from "react-hook-form";

interface FormInputProps extends Omit<TextFieldProps, 'name'> {
  name: string;
  control: Control<any>;
  rules?: RegisterOptions;
  accept?: string;
}

export const InputField = ({ name, control, accept, ...rest }: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ 
        field: { onChange, value },
         fieldState: { error },
         formState
         }) => (
          <TextField
          {...rest}
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          variant="outlined"
        />
      )}
    />
  )
}
