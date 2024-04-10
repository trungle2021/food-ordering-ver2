import { PATH } from "~/routes/routes.constant";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

export const Navbar = ({ items }: { items: NavItems[] }) => {
  const onClickLogout = () => {
    console.log("Logout");
  };
  return (
    <nav className={styles["navbar__container"]}>
      <ul className={styles["navbar__list"]}>
        {items.map((item: NavItems) => (
          <li className={styles["navbar__item"]} key={item.url}>
            <Link
              to={item.url === PATH.LOGOUT.toString() ? "#" : item.url}
              className={styles["navbar__link"]}
              onClick={item.url === PATH.LOGOUT ? onClickLogout : () => {}}
            >
              <img src={item.src} />
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
