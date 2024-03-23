import { GlobalStyles } from "./components/GlobalStyles/GlobalStyles";
import LeftSideBar from "./layout/LeftSideBar/LeftSideBar";
import MainContent from "./layout/MainContent/MainContent";
import RightSideBar from "./layout/RightSideBar/RightSideBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";


function App() {
  return (
    <GlobalStyles>
      <BrowserRouter>
        <div className="wrapper__container">
          <LeftSideBar className="sidebar" />
          <MainContent />
          <RightSideBar className="sidebar" />
        </div>
      </BrowserRouter>
    </GlobalStyles>
  );
}

export default App;
