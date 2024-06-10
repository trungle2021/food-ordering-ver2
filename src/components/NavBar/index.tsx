
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { logoutUser } from "~/features/Auth/authAction";
import styles from "./styles.module.css";
import { LogoutIcon } from "../UI/Icon";




export const Navbar = ({ items }: { items: any }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false); // State to control the dialog's open state

  const handleLogout = () => {
    setLogoutDialogOpen(true); // Open the logout dialog
  };

  const handleLogoutConfirmed = async () => {
    await dispatch<any>(logoutUser());
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

      {/* Logout Dialog */}
      {/* <Dialog open={logoutDialogOpen} onClose={handleLogoutCancelled} fullWidth maxWidth='md' >
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ 'fontSize': '30px' }}>
            Are you sure you want to logout?'
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancelled}>Cancel</Button>
          <Button onClick={handleLogoutConfirmed} autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog> */}

    </nav>
  );
};