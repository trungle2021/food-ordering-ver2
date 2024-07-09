import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";



export const InputField = (props: any) => {
  const { name, control, label, placeholder, type, enableHelperText = true, ...rest } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...rest}
          helperText={enableHelperText && error?.message}
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
