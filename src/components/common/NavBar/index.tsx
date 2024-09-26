import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { LogoutIcon } from "../UI/Icon";
import { useLogoutMutation } from "~/services/auth/authService";
import styles from "./styles.module.css";
import { logoutUser } from "~/store/auth/authSlice";

export const Navbar = ({ items }: { items: any }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false); // State to control the dialog's open state
  const [logout, { isLoading }] = useLogoutMutation(); // Use RTK Query for logout

  const handleLogout = () => {
    setLogoutDialogOpen(true); // Open the logout dialog
  };

  const handleLogoutConfirmed = async () => {
    await logout().unwrap(); // Call the logout mutation
    await dispatch<any>(logoutUser());
    await dispatch({type: "USER_LOGOUT"})
    history.push('/login'); // Redirect to login after logout
  };

  const handleLogoutCancelled = () => {
    setLogoutDialogOpen(false); // Close the logout dialog
  };

  return (
    <nav className={styles["navbar__container"]}>
      <ul className={styles["navbar__list"]}>
        {items.map((item: any) => (
          <li className={styles["navbar__item"]} key={item.url}>
            <Link to={item.url} className={styles["navbar__link"]}>
              {item.icon}
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
        <li className={styles["navbar__item"]}>
          <a onClick={handleLogout} className={styles["navbar__link"]}>
            <LogoutIcon />
            <span>Logout</span>
          </a>
        </li>
      </ul>

      <Dialog open={logoutDialogOpen} onClose={handleLogoutCancelled} fullWidth maxWidth='md'>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ fontSize: '30px' }}>
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={handleLogoutCancelled}>Cancel</Button>
          <Button type="button" onClick={handleLogoutConfirmed} autoFocus disabled={isLoading}>
            {isLoading ? 'Logging out...' : 'Logout'}
          </Button>
        </DialogActions>
      </Dialog>
    </nav>
  );
};
