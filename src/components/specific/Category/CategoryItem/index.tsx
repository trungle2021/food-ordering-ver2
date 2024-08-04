import { Card, CardContent, CardMedia } from "@mui/material";
import styles from "./styles.module.css";

type CategoryProps = {
  iconLink: string;
  name: string;
};

const CategoryItem = ({ iconLink, name }: CategoryProps) => {
  return (
    <a href={`/dishes?category-name=${name}`}>
      <div className={`${styles["category-item"]}`}>
      <img src={iconLink} />
      <span>{name}</span>
    </div>
    </a>
  );
};

export default CategoryItem;
