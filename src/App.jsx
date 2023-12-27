import LeftSideBar from "./components/Layout/LeftSideBar/LeftSideBar";
import MainContent from "./components/Layout/MainContent/MainContent";
import RightSideBar from "./components/Layout/RightSideBar/RightSideBar";
function App() {
  return (
    <div className="wrapper__container">
      <LeftSideBar className='sidebar' />
      <MainContent className='main__content' />
      <RightSideBar className='sidebar' />
    </div>
  );
}

export default App;
