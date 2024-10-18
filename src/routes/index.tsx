import { PATH } from "./routes.constant";
import { Favorites } from "~/pages/Favorites";
import { OrderHistory } from "~/pages/OrderHistory";
import { Dashboard } from "~/pages/Dashboard";
import { Switch } from 'react-router-dom';
import { PrivateRoute } from "./PrivateRoute";
import { UserProfile } from "~/pages/UserProfile";
import { Checkout } from "~/pages/Checkout";
import { DishPage } from "~/pages/Dishes";


function Routes() {
  return (
    <Switch>
      <PrivateRoute path={PATH.DASHBOARD} component={Dashboard} />
      <PrivateRoute path={PATH.FAVORITE} component={Favorites} />
      <PrivateRoute path={PATH.DISHES} component={DishPage} />
      <PrivateRoute path={PATH.ORDER_HISTORY} component={OrderHistory} />
      <PrivateRoute path={PATH.USER_PROFILE} component={UserProfile} />
      <PrivateRoute
        path={`${PATH.CHECKOUT}/:sessionId?`}
        component={Checkout}
        requiredParams={['sessionId']} 
        routeIfNotMatch={PATH.DASHBOARD}
        />
    </Switch>
  );
}

export default Routes;
