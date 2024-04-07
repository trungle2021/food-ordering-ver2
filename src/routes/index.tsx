import { Login } from "../pages/Login";
import { ForgotPassword } from "../pages/ForgotPassword";
import { Register } from "../pages/Register";
import { PATH } from "./routes.constant";
import { Route, Switch } from "react-router-dom";
import { Favorites } from "../pages/Favorites";
import { FoodOrder } from "../pages/FoodOrder";
import { OrderHistory } from "../pages/OrderHistory";
import { Dashboard } from "../pages/Dashboard";
import { Bills } from "../pages/Bill";
import { Settings } from "../pages/Setting";
import { Notfound } from "../pages/NotFound";
import { Logout } from "../pages/Logout";

function Routes() {
  return (
    <>
      <Route exact path={PATH.INDEX} component={Dashboard} />
      <Route path={PATH.FOOD_ORDER} component={FoodOrder} />
      <Route path={PATH.FAVORITE} component={Favorites} />
      <Route path={PATH.ORDER_HISTORY} component={OrderHistory} />
      <Route path={PATH.BILLS} component={Bills} />
      <Route path={PATH.SETTINGS} component={Settings} />
      <Route path={PATH.LOGOUT} component={Logout} />
    </>
  );
}

export default Routes;
