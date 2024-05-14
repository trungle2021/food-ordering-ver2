import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";


export const InputField = ({ name, control, label, placeholder, type, ...rest }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...rest}
          helperText={error ? error.message : null}
          error={!!error}
          fullWidth
          label={label}
          type={type}
          variant="outlined"
          placeholder={placeholder}

        />
      )}
    />
  );
};
