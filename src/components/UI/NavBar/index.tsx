
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useState } from "react";
import { logoutUser } from "~/features/Auth/authAction";



export const Navbar = ({ items }: { items: NavItems[] }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);
  const id = auth.user._id;
  const history = useHistory();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false); // State to control the dialog's open state

  const handleLogout = () => {
    setLogoutDialogOpen(true); // Open the logout dialog
  };

  const handleLogoutConfirmed = async () => {
    const payload = {
      user: id
    };
    await dispatch<any>(logoutUser(payload));
    console.log("logged out");
    history.push('/login');
  };

  const handleLogoutCancelled = () => {
    setLogoutDialogOpen(false); // Close the logout dialog
  };
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


      {/* Logout Dialog */}
      <Dialog open={logoutDialogOpen} onClose={handleLogoutCancelled} fullWidth maxWidth='md' >
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
      </Dialog>
    </nav>
  );
};