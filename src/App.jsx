import LeftSideBar from "./components/Layout/LeftSideBar/LeftSideBar";
import MainContent from "./components/Layout/MainContent/MainContent";
import RightSideBar from "./components/Layout/RightSideBar/RightSideBar";
import { AppContextProvider } from "./store/AppContext";
import 'boxicons';
function App() {
  return (
    <div className="wrapper-container">
      <LeftSideBar className='sidebar sidebar-left' />
      <MainContent className='main-content' />
      <RightSideBar className='sidebar sidebar-right' />
    </div>
  );
}

export default App;
