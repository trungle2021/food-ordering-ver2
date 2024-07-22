import { exact } from "prop-types";
import { useRouteMatch } from "react-router-dom";
import LeftSideBar from "~/layout/LeftSideBar";
import MainContent from "~/layout/MainContent";
import RightSideBar from "~/layout/RightSideBar";
import { PATH } from "~/routes/routes.constant";


export const Home = () => {
    const match = useRouteMatch({
        path: PATH.DASHBOARD,
        exact: true
    })

  return (
    <div className="wrapper-container">
      <LeftSideBar className="sidebar" />
      <MainContent />
      {match && <RightSideBar className="sidebar" />}
    </div>
  );
};
