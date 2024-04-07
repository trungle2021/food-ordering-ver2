import { Switch } from "react-router-dom";
import { GlobalStyles } from "./components/GlobalStyles";
import LeftSideBar from "./layout/LeftSideBar";
import MainContent from "./layout/MainContent";
import RightSideBar from "./layout/RightSideBar";
import { BrowserRouter } from "react-router-dom";
import { PATH } from "./routes/routes.constant";
import { Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ForgotPassword } from "./pages/ForgotPassword";
import { Notfound } from "./pages/NotFound";

function App() {
  return (
    <GlobalStyles>
      <BrowserRouter>
        <Switch>
          <Route exact path={PATH.LOGIN} component={Login} />
          <Route exact path={PATH.REGISTER} component={Register} />
          <Route exact path={PATH.FORGOT_PASSWORD} component={ForgotPassword} />
          <div className="wrapper-container">
            <LeftSideBar className="sidebar" />
            <MainContent />
            <RightSideBar className="sidebar" />
          </div>
          <Route component={Notfound} />
        </Switch>
      </BrowserRouter>
    </GlobalStyles>
  );
}

export default App;
