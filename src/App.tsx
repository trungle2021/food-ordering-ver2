import { Switch, Route } from "react-router-dom";
import { PATH } from "./routes/routes.constant";
import { GlobalStyles } from "./components/GlobalStyles";
import { Login } from "./features/Auth/Login";
import { Notfound } from "./pages/NotFound";
import { Home } from "./pages/Home";
import { ForgotPassword } from "./features/Auth/ForgotPassword";
import { Register } from "./features/Auth/Register";
import { PrivateRoute } from "./routes/PrivateRoute";
import { PublicRoute } from "./routes/PublicRoute";
import { ToastContainer } from "react-toastify";
import { Checkout } from "./pages/Checkout";

function App() {
  return (
    <GlobalStyles>
        <ToastContainer/>
      <Switch>
        <PublicRoute path={PATH.LOGIN} component={Login} />
        <PublicRoute path={PATH.REGISTER} component={Register}/>
        <PublicRoute path={PATH.FORGOT_PASSWORD} component={ForgotPassword} />
        <PrivateRoute path={PATH.INDEX} component={Home}/>
        <Route component={Notfound} />
      </Switch>
    </GlobalStyles>
  );
}

export default App;
