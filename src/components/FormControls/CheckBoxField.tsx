import { Checkbox, FormControlLabel } from "@mui/material";
import { Controller } from "react-hook-form";

type CheckBoxFieldProps = {
  name: string;
  label: string;
  checked?: boolean;
  control: any;
  disabled?: boolean;
};

export const CheckBoxField = ({
  name,
  label,
  control,
  disabled
}: CheckBoxFieldProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }: any) => (
        <FormControlLabel
          control={<Checkbox
             label={label}
              disabled={disabled}
              checked={field.value} 
              onChange={field.onChange}
              onBlur={field.onBlur}
              {...field} />}
          label={label}
        />
      )}
    />
  );
};
