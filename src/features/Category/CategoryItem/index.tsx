import { Card, CardContent, CardMedia } from "@mui/material";
import styles from "./styles.module.css";

type CategoryProps = {
  iconLink: string;
  name: string;
};

const CategoryItem = ({ iconLink, name }: CategoryProps) => {
  return (
    <div className={`${styles["category-item"]}`}>
      <img src={iconLink} />
      <span>{name}</span>
    </div>
    // <Card>
    //   <CardMedia 
    //       component="img" // Specify the type of media (img, video, audio)
    //       src={iconLink} // Source of the media content
    //       alt="Media Image" // Alt text for accessibility
    //   />
    //   <CardContent>

    //   </CardContent>
    // </Card>
  );
};

export default CategoryItem;
