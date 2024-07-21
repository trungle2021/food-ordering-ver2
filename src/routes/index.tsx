import { PATH } from "./routes.constant";
import { Favorites } from "~/pages/Favorites";
import { FoodOrder } from "~/pages/FoodOrder";
import { OrderHistory } from "~/pages/OrderHistory";
import { Dashboard } from "~/pages/Dashboard";
import { Bills } from "~/pages/Bill";
import { Settings } from "~/pages/Setting";
import { Switch } from 'react-router-dom';
import { PrivateRoute } from "./PrivateRoute";
import { Checkout } from "~/pages/Checkout";
import { useParams } from "react-router-dom";
import { Redirect } from "react-router-dom";


function Routes() {
  return (
    <Switch>
      <PrivateRoute path={PATH.DASHBOARD} component={Dashboard} />
      <PrivateRoute path={PATH.FOOD_ORDER} component={FoodOrder} />
      <PrivateRoute path={PATH.FAVORITE} component={Favorites} />
      <PrivateRoute path={PATH.ORDER_HISTORY} component={OrderHistory} />
      <PrivateRoute path={PATH.BILL} component={Bills} />
      <PrivateRoute path={PATH.SETTING} component={Settings} />
      <PrivateRoute
        path={`${PATH.CHECKOUT}/:orderId?`}
        exact
        component={Checkout}
        requiredParams={['orderId']} 
        routeIfNotMatch={PATH.DASHBOARD}
        />
    </Switch>
  );
}

export default Routes;
