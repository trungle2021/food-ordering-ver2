import { GlobalStyles } from "./components/GlobalStyles/GlobalStyles";
import LeftSideBar from "./components/Layout/LeftSideBar/LeftSideBar";
import MainContent from "./components/Layout/MainContent/MainContent";
import RightSideBar from "./components/Layout/RightSideBar/RightSideBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";


function App() {
  return (
    <Router>
      <Switch>
       
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
