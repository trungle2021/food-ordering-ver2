import { PATH } from "./routes.constant";
import { Favorites } from "~/features/Favorites";
import { OrderHistory } from "~/features/OrderHistory";
import { Dashboard } from "~/features/Dashboard";
import { Settings } from "~/features/Setting";
import { Switch } from 'react-router-dom';
import { PrivateRoute } from "./PrivateRoute";
import { Checkout } from "~/features/Checkout";
import { UserProfile } from "~/features/User/UserProfile";


function Routes() {
  return (
    <Switch>
      <PrivateRoute path={PATH.DASHBOARD} component={Dashboard} />
      <PrivateRoute path={PATH.FAVORITE} component={Favorites} />
      <PrivateRoute path={PATH.ORDER_HISTORY} component={OrderHistory} />
      <PrivateRoute path={PATH.USER_PROFILE} component={UserProfile} />
      <PrivateRoute
        path={`${PATH.CHECKOUT}/:orderId?`}
        component={Checkout}
        requiredParams={['orderId']} 
        routeIfNotMatch={PATH.DASHBOARD}
        />
    </Switch>
  );
}

export default Routes;
