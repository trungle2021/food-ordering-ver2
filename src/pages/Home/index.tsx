import { useRouteMatch } from "react-router-dom";
import LeftSideBar from "~/components/layout/LeftSideBar";
import RightSideBar from "~/components/layout/RightSideBar";
import MainContent from "~/components/layout/MainContent";
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
