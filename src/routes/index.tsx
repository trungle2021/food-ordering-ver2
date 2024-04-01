import { Login } from '../pages/Auth/Login';
import { ForgotPassword } from '../pages/Auth/ForgotPassword/ForgotPassword';
import { Register } from '../pages/Auth/Register/Register';
import { ResetPassword } from '../pages/Auth/ResetPassword/ResetPassword';
import { PATH } from './routes.constant';
import { Route, Switch } from "react-router-dom";
import { Favorites } from "../pages/Favorites/Favorites";
import { FoodOrder } from "../pages/FoodOrder";
import { OrderHistory } from "../pages/OrderHistory";
import { Dashboard } from "../pages/Dashboard";
import { Bills } from "../pages/Bills";
import { Settings } from "../pages/Settings";
import { Notfound } from "../pages/Notfound";
import { Logout } from "../pages/Logout";


function Routes  ()  {
     return (
       <Switch>
          <Route exact path={PATH.INDEX} component={Dashboard} />
          <Route path={PATH.FOOD_ORDER} component={FoodOrder} />
          <Route path={PATH.FAVORITE} component={Favorites} />
          <Route path={PATH.ORDER_HISTORY}  component={OrderHistory} />
          <Route path={PATH.BILLS}  component={Bills} />
          <Route path={PATH.SETTINGS}  component={Settings} />
          <Route path={PATH.LOGIN}  component={Login} />
          <Route path={PATH.FORGOT_PASSWORD}  component={ForgotPassword} />
          <Route path={PATH.REGISTER}  component={Register} />
          <Route path={PATH.LOGOUT}  component={Logout} />
          <Route component={Notfound} />
       </Switch>
     )
};

export default Routes;

