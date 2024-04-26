import { PATH } from "./routes.constant";
import { Favorites } from "~/pages/Favorites";
import { FoodOrder } from "~/pages/FoodOrder";
import { OrderHistory } from "~/pages/OrderHistory";
import { Dashboard } from "~/pages/Dashboard";
import { Bills } from "~/pages/Bill";
import { Settings } from "~/pages/Setting";
import { Switch } from 'react-router-dom';
import { PrivateRoute } from "./PrivateRoute";


function Routes() {
  return (
    <Switch>
      <PrivateRoute path={PATH.DASHBOARD} component={Dashboard} />
      <PrivateRoute path={PATH.FOOD_ORDER} component={FoodOrder}/>
      <PrivateRoute path={PATH.FAVORITE} component={Favorites} />
      <PrivateRoute path={PATH.ORDER_HISTORY} component={OrderHistory}/>
      <PrivateRoute path={PATH.BILLS} component={Bills} />
      <PrivateRoute path={PATH.SETTINGS} component={Settings}/>
    </Switch>
  );
}

export default Routes;
