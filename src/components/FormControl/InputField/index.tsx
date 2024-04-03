
import { Controller } from 'react-hook-form';
import Form from "react-bootstrap/Form";


type InputFieldProps = {
        form: any,
        name: string,
        label?: string,
        type?: string,
        placeHolder?: string,
        disabled?: boolean
}

export const InputField = ({form, name, label='', disabled = false, type='text', placeHolder=''}: InputFieldProps) => {
    const{control, formState: {errors}} = form
    console.log(form)
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => <Form.Control className='' type={type}  {...field} aria-label={label} placeholder={placeHolder} disabled={disabled}/>}
        />
    )
}
