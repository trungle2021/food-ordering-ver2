import { GlobalStyles } from "./components/GlobalStyles";
import { BrowserRouter, Switch } from "react-router-dom";
import { PATH } from "./routes/routes.constant";
import { Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { ForgotPassword } from "./pages/ForgotPassword";
import { Notfound } from "./pages/NotFound";

function App() {
  return (
    <GlobalStyles>
      <BrowserRouter>
      <Switch>
          <Route path={PATH.LOGIN} component={Login}/>
          <Route path={PATH.REGISTER} component={Register} />
          <Route path={PATH.FORGOT_PASSWORD} component={ForgotPassword} />
          <Route path={PATH.INDEX} component={Home} />
          <Route component={Notfound} />
      </Switch>
          
      </BrowserRouter>
    </GlobalStyles>
  );
}

export default App;
