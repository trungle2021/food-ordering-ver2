import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../authSlice";
import { useHistory } from "react-router-dom";


export const Logout = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);
  dispatch(logoutUser())
  history.push("/login");
  return <div>Logout</div>;
};
