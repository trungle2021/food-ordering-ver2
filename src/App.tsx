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
import { GoogleOAuthProvider } from "@react-oauth/google";


function App() {
  return (
    <GoogleOAuthProvider clientId="810591686997-8pn6na96q83ui05rh5qprnk93lp28vla.apps.googleusercontent.com">
      <GlobalStyles>
        <ToastContainer />
        <Switch>
          <PublicRoute path={PATH.LOGIN} component={Login} />
          <PublicRoute path={PATH.REGISTER} component={Register} />
          <PublicRoute path={PATH.FORGOT_PASSWORD} component={ForgotPassword} />
          <PrivateRoute path={PATH.INDEX} component={Home} />
          <Route component={Notfound} />
        </Switch>
      </GlobalStyles>
    </GoogleOAuthProvider>
  );
}

export default App;
