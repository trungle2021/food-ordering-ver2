import LeftSideBar from "./components/Layout/LeftSideBar/LeftSideBar";
import MainContent from "./components/Layout/MainContent/MainContent";
import RightSideBar from "./components/Layout/RightSideBar/RightSideBar";
import { LeftSideBarProvider } from "./store/LeftSideBarContext";
import SideBarItems from "./components/Layout/LeftSideBar/SideBarItems/SideBarItems";
function App() {
  return (
    <div className="flex">
      <LeftSideBarProvider>
        <LeftSideBar className={`w-1/5`}>
          <SideBarItems />
        </LeftSideBar>
      </LeftSideBarProvider>

      <MainContent className={`w-3/5`} />
      <RightSideBar className={`w-1/5`} />
    </div>
  );
}

export default App;
