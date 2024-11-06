import { TextField, TextFieldProps } from "@mui/material";
import { Control, Controller, RegisterOptions } from "react-hook-form";

interface FormInputProps {
  name: string;
  control: Control<any>;
  label?: string;
  rules?: RegisterOptions;
  sx?: TextFieldProps['sx'];
}

export const InputField = ({ name, control, label, sx, ...rest }: FormInputProps) => {
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
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
          sx={sx}
        />
      )}
    />
  )
}
