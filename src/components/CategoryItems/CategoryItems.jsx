import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryItem from "./CategoryItem/CategoryItem";
import {getCategoriesApi} from './../../utils/api'



const CategoryItems = () => {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    const getCategories = async () => {
      try{
        const response = await axios.get(`${getCategoriesApi}?limit=10`)
        setCategories(response.data.data)
      }catch(err){
        console.log(err)
      }
    }
    getCategories()
  },[])

  const categoryItems = categories.map((item)=>{
    return <CategoryItem key={item._id} iconLink={item.image} name={item.name} />
  })

  return (
    <ul className="flex justify-evenly basis-32 gap-3">
      {categoryItems}
    </ul>
  );
};

export default CategoryItems;
