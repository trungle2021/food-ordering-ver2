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
  );
};

export default CategoryItem;
