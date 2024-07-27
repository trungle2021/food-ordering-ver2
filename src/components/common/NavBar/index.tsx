
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { logoutUser } from "~/store/auth/authAction";
import { LogoutIcon } from "../UI/Icon";
import styles from "./styles.module.css";

export const Navbar = ({ items }: { items: any }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false); // State to control the dialog's open state

  const handleLogout = () => {
    setLogoutDialogOpen(true); // Open the logout dialog
  };

  const handleLogoutConfirmed = async () => {
    await dispatch<any>(logoutUser());
    await dispatch({type: "USER_LOGOUT",})
    history.push('/login');
  };

  const handleLogoutCancelled = () => {
    setLogoutDialogOpen(false); // Close the logout dialog
  };
  return (
    <nav className={styles["navbar__container"]}>
      <ul className={styles["navbar__list"]}>
        {items.map((item: any) => (
          <li className={styles["navbar__item"]} key={item.url}>
            <Link
              to={item.url}
              className={styles["navbar__link"]}
            >
                {item.icon}
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
        <li className={styles["navbar__item"]}>
          <a
            onClick={handleLogout}
            className={styles["navbar__link"]}
          >
            <LogoutIcon/>
            <span>Logout</span>
          </a>
        </li>
      </ul>

      <Dialog open={logoutDialogOpen} onClose={handleLogoutCancelled} fullWidth maxWidth='md' >
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ 'fontSize': '30px' }}>
            Are you sure you want to logout?'
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={handleLogoutCancelled}>Cancel</Button>
          <Button type="button" onClick={handleLogoutConfirmed} autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </nav>
  );
};