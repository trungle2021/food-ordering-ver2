import { GlobalStyles } from "./components/GlobalStyles/GlobalStyles";
import LeftSideBar from "./components/Layout/LeftSideBar/LeftSideBar";
import MainContent from "./components/Layout/MainContent/MainContent";
import RightSideBar from "./components/Layout/RightSideBar/RightSideBar";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <GlobalStyles>
        <div className="wrapper__container">
          <LeftSideBar className="sidebar" />
          <MainContent />
          <RightSideBar className="sidebar" />
        </div>
      </GlobalStyles>
    </Router>
  );
}

export default App;
