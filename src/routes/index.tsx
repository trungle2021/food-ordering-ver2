import { PATH } from "./routes.constant";
import { Route } from "react-router-dom";
import { Favorites } from "~/pages/Favorites";
import { FoodOrder } from "~/pages/FoodOrder";
import { OrderHistory } from "~/pages/OrderHistory";
import { Dashboard } from "~/pages/Dashboard";
import { Bills } from "~/pages/Bill";
import { Settings } from "~/pages/Setting";
import { Logout } from "~/features/Auth/Logout";
import { Switch } from "react-router-dom";

function Routes() {
  return (
    <Switch>
      <Route path={PATH.DASHBOARD} component={Dashboard} />
      <Route path={PATH.FOOD_ORDER} component={FoodOrder} />
      <Route path={PATH.FAVORITE} component={Favorites} />
      <Route path={PATH.ORDER_HISTORY} component={OrderHistory} />
      <Route path={PATH.BILLS} component={Bills} />
      <Route path={PATH.SETTINGS} component={Settings} />
      <Route path={PATH.LOGOUT} component={Logout} />
    </Switch>
  );
}

export default Routes;
