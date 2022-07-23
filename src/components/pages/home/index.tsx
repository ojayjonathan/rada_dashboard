import React from "react";
import { PieChartData, SmallStatChartData } from "../../../types/types";
import { getuserMetrics } from "../../../utils/services/user";
import { generateChartData } from "../../../utils/utils";
import PieChart from "../../charts/piechart";
import SmallStats from "../../charts/smallStat";
import { DashboardContext } from "../../dashboard";
import Forums from "../../forums";

type AnalyticsData = {
  gender?: PieChartData;
};
function Home() {
  const { user } = React.useContext(DashboardContext);
  const [analyticsData, setData] = React.useState<AnalyticsData>({});

  const SmallStatData = generateChartData(
    ["January", "February", "March", "April", "May", "June"],
    [0, 10, 5, 2, 20, 30, 45],
    "rgba(45,203,126,.5)",
    true
  );
  const init = async () => {
    const analytics = await getuserMetrics();
    if (analytics.analytics) {
      setData((analyticsData: any) => {
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

  React.useEffect(() => {
    init();
  }, []);

  return (
    <div className="container mx-auto">
      <h3 className="my-5">Welcome back, {user?.name}</h3>
      <div className="row">
        <div className="col-12 col-sm-4  mb-4">
          <PieChart data={analyticsData.gender} title="Age Comparison" />
        </div>
        <div className="col-12 col-sm-4 mb-4">
          <PieChart data={analyticsData.gender} title="Gender" />
        </div>
        <div className="col-12 col-sm-4 mb-4">
          <SmallStats
            data={SmallStatData as SmallStatChartData}
            label="User Online"
            value="30"
          />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12 col-sm-6 col-lg-7 mb-4 position-relative">
          <Forums />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12 col-sm-6 col-lg-5 mb-4"></div>
      </div>
    </div>
  );
}

export default Home;
