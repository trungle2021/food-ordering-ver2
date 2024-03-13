import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import { GlobalStyles } from "./components/GlobalStyles/GlobalStyles";
import LeftSideBar from "./components/Layout/LeftSideBar/LeftSideBar";
import MainContent from "./components/Layout/MainContent/MainContent";
import RightSideBar from "./components/Layout/RightSideBar/RightSideBar";
import { BrowserRouter as Router } from "react-router-dom";
import { Login } from "./components/Page/Auth/Login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { ForgotPassword } from "./components/Page/Auth/ForgotPassword/ForgotPassword";
import { Register } from "./components/Page/Auth/Register/Register";
import { ResetPassword } from "./components/Page/Auth/ResetPassword/ResetPassword";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/register" component={Register} />
        <Route path="/reset-password" component={ResetPassword} />
        <GlobalStyles>
          <div className="wrapper__container">
            <LeftSideBar className="sidebar" />
            <MainContent />
            <RightSideBar className="sidebar" />
          </div>
        </GlobalStyles>
      </Switch>
    </Router>
  );
}

export default App;
