import { Checkbox, FormControlLabel } from "@mui/material";
import { Controller } from "react-hook-form";

type CheckBoxFieldProps = {
  name: string;
  label: string;
  checked?: false;
  control: any;
};

export const CheckBoxField = ({
  name,
  label,
  checked,
  control,
}: CheckBoxFieldProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }: any) => (
        <FormControlLabel
          control={<Checkbox label={label} checked={checked} {...field} />}
          label={label}
        />
      )}
    />
  );
};
