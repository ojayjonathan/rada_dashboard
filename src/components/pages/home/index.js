import React from "react";
import { USER_ROLES } from "../../../utils/constants";
import { getuserMetrics } from "../../../utils/services/user.services";
import { generateChartData } from "../../../utils/utils";
import PieChart from "../../charts/piechart";
import SmallStats from "../../charts/smallStat";
import Chats from "../../chats";
import { DashboardContext } from "../../dashboard";
import Forums from "../../forums";
import Schedule from "../../schedule";

function Home() {
  const { user, roles } = React.useContext(DashboardContext);
  
  const [analyticsData, setData] = React.useState({
    gender: {},
  });
  const data = generateChartData(["O25", "U25"], [14, 10]);
  const SmallStatData = generateChartData(
    ["January", "February", "March", "April", "May", "June"],
    [0, 10, 5, 2, 20, 30, 45],
    "rgba(45,203,126,.5)",
    true
  );

  React.useEffect(() => {
    const init = async () => {
     
      const analytics = await getuserMetrics();
      if (analytics.analytics) {
        setData((analyticsData) => {
          const genderAnalytics = generateChartData(
            ["Male", "Female"],
            [
              analytics.analytics.totalNoMaleUsers,
              analytics.analytics.totalNoFemaleUsers,
            ]
          );
          return { ...analyticsData, gender: genderAnalytics };
        });
      }
    };
    init();
  }, []);

  return (
    <div className="container mx-auto">
      <h3 className="my-5">Welcome back, {user.name}</h3>
      <div className="row">
        <div className="col-12 col-sm-4  mb-4">
          <PieChart data={data} title="Age Comparison" />
        </div>
        <div className="col-12 col-sm-4 mb-4">
          <PieChart data={analyticsData.gender} title="Gender" />
        </div>
        <div className="col-12 col-sm-4 mb-4">
          <SmallStats data={SmallStatData} label="User Online" value="30" />
        </div>
      </div>
      {roles.includes(USER_ROLES.counsellor) && (
        <div className="row mt-5">
          <div className="col-12 col-sm-6 col-lg-5 mb-4">
            <Schedule />
          </div>
          <div className="col-12 col-sm-6 col-lg-7 mb-4">
            <Chats />
          </div>
        </div>
      )}
      <div className="row mt-5">
        <div className="col-12 col-sm-6 col-lg-5 mb-4">
          <Forums />
        </div>
      </div>
    </div>
  );
}

export default Home;
