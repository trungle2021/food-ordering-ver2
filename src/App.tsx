import { Switch, Route } from "react-router-dom";
import { PATH } from "./routes/routes.constant";
import { Notfound } from "./pages/NotFound";
import { Home } from "./pages/Home";
import { PrivateRoute } from "./routes/PrivateRoute";
import { PublicRoute } from "./routes/PublicRoute";
import { ToastContainer } from "react-toastify";
import { GlobalStyles } from "./components/common/GlobalStyles";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ForgotPassword } from "./pages/ForgotPassword";


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
