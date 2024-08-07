import { Checkbox, FormControlLabel, FormGroup } from "@mui/material"
import { useState } from "react"

interface CheckedCategories {
    [key: string]: boolean;
}

interface CategoryCheckBoxProps {
    categories: {
        _id: string;
        name: string;
    }[];
    checkedCategories: CheckedCategories;
    onChange: (checkedCategories: CheckedCategories, categoryId: string) => void
}
export const CategoryCheckBox = ({ categories, checkedCategories, onChange }: CategoryCheckBoxProps,) => {
    const handleCheckCategory = (event: any, categoryId: string) => {
        onChange({
            ...checkedCategories,
            [categoryId]: event.target.checked
        }, categoryId)
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