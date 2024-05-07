import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

interface InputFieldProps {
  name: string;
  label?: string;
  type: string;
  placeholder?: string;
  style?: React.CSSProperties;
  control: any;
}

export const InputField = (props: InputFieldProps) => {
  const { name, label, type, placeholder, style, control } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          helperText={error ? error.message : null}
          error={!!error}
          fullWidth
          label={label}
          type={type}
          variant="outlined"
          placeholder={placeholder}
          sx={style}
        />
      )}
    />
  );
};
