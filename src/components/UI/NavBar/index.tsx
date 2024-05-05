
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "~/features/Auth/authSlice";
import { useHistory } from "react-router-dom";

export const Navbar = ({ items }: { items: NavItems[] }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);
  const id = auth.user._id;
  const history = useHistory();
  const handleLogout = async () => {
    const payload = {
      user: id
    }
    await dispatch<any>(logoutUser(payload))
    console.log("logged out");
    history.push('/login');
  }

  return (
    <nav className={styles["navbar__container"]}>
      <ul className={styles["navbar__list"]}>
        {items.map((item: NavItems) => (
          <li className={styles["navbar__item"]} key={item.url}>
            <Link
              to={item.url}
              className={styles["navbar__link"]}
            >
              <img src={item.src} />
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
         <li className={styles["navbar__item"]}>
            <a
              onClick={handleLogout}
              className={styles["navbar__link"]}
            >
              <img src="/icon/Logout.svg" />
              <span>Logout</span>
            </a>
          </li>
      </ul>
    </nav>
  );
};