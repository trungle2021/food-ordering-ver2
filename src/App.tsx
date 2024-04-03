import { GlobalStyles } from "./components/GlobalStyles";
import LeftSideBar from "./layout/LeftSideBar";
import MainContent from "./layout/MainContent";
import RightSideBar from "./layout/RightSideBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <GlobalStyles>
      <BrowserRouter>
        <div className="wrapper-container">
          <LeftSideBar className="sidebar" />
          <MainContent />
          <RightSideBar className="sidebar" />
        </div>
      </BrowserRouter>
    </GlobalStyles>
  );
}

export default App;
