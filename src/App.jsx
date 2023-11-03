import LeftSideBar from "./components/Layout/LeftSideBar/LeftSideBar";
import MainContent from "./components/Layout/MainContent/MainContent";
import RightSideBar from "./components/Layout/RightSideBar/RightSideBar";
import { AppContextProvider } from "./store/AppContext";
import SideBarItems from "../src/components/Layout/SideBarItems/SideBarItems";
function App() {
  return (
    <div className="flex w-full">
      <AppContextProvider>
        <LeftSideBar sideBarItems={<SideBarItems />} />
      </AppContextProvider>
      <MainContent className="flex-grow" />
      <RightSideBar />
    </div>
  );
}

export default App;
