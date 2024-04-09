import { Switch, Route } from "react-router-dom";
import { PATH } from "./routes/routes.constant";
import { GlobalStyles } from "./components/GlobalStyles";
import { Login } from "./features/Auth/Login";
import { Notfound } from "./pages/NotFound";
import { Home } from "./pages/Home";
import { ForgotPassword } from "./features/Auth/ForgotPassword";
import { Register } from "./features/Auth/Register";

function App() {
  return (
    <GlobalStyles>
      <Switch>
        <Route path={PATH.LOGIN} component={Login} />
        <Route path={PATH.REGISTER} component={Register} />
        <Route path={PATH.FORGOT_PASSWORD} component={ForgotPassword} />
        <Route path={PATH.INDEX} component={Home} />
        <Route component={Notfound} />
      </Switch>
    </GlobalStyles>
  );
}

export default App;
