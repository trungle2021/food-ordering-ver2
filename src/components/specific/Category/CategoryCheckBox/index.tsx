import { Checkbox, FormControlLabel, FormGroup } from "@mui/material"

interface CheckedCategories {
    [key: string]: boolean;
}

interface CategoryCheckBoxProps {
    categories: {
        _id: string;
        name: string;
    }[];
    checkedCategories: CheckedCategories;
    onChange: (checkedCategories: CheckedCategories, catId: string) => void
}
export const CategoryCheckBox = ({ categories, checkedCategories, onChange }: CategoryCheckBoxProps,) => {
    const handleCheckCategory = (event: any, catId: string) => {
        onChange({
            ...checkedCategories,
            [catId]: event.target.checked
        }, catId)
    }


    return (
        <FormGroup>
            {categories.length > 0 && categories.map((category) => (
                <FormControlLabel
                    sx={{
                        '& .MuiFormControlLabel-label': {
                            fontSize: '1.5rem',
                        },
                    }}
                    key={category._id}
                    control={
                        <Checkbox
                            checked={!!checkedCategories[category._id]}
                            onChange={(event) => handleCheckCategory(event, category._id)}
                        />
                    }
                    label={category.name}
                />
            ))}
        </FormGroup>
    )
}