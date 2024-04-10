import LeftSideBar from "~/layout/LeftSideBar";
import MainContent from "~/layout/MainContent";
import RightSideBar from "~/layout/RightSideBar";

export const Home = () => {
  const handleClickLogout = () => {};
  return (
    <div className="wrapper-container">
      <LeftSideBar className="sidebar" />
      <MainContent />
      <RightSideBar className="sidebar" />
    </div>
  );
};
