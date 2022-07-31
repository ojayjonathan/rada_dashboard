import React from "react";
import { useAnalytics } from "../../../rest/hooks/users";
import { generateChartData } from "../../../utils";
import PieChart from "../../charts/piechart";
import SmallStats from "../../charts/smallStat";
import { DashboardContext } from "../../dashboard";
import Forums from "../../forums";

function Home() {
  const { user } = React.useContext(DashboardContext);
  const { data } = useAnalytics();

  const SmallStatData = generateChartData({
    labels: ["January", "February", "March", "April", "May", "June"],
    data: [0, 10, 5, 2, 20, 30, 45],
    backgroundColor: "rgba(45,203,126,.5)",
    fill: true,
  });

  const genderComparison = () => {
    if (data)
      return generateChartData({
        labels: ["Male", "Female"],
        data: [
          data.metrics.analytics.totalNoMaleUsers,
          data.metrics.analytics.totalNoFemaleUsers,
        ],
      });
    return null;
  };

  return (
    <div className="container mx-auto">
      <h3 className="my-5">Welcome back, {user?.name}</h3>
      <div className="row">
        <div className="col-12 col-sm-4  mb-4">
          <PieChart data={genderComparison()} title="Age Comparison" />
        </div>
        <div className="col-12 col-sm-4 mb-4">
          <PieChart data={genderComparison()} title="Gender" />
        </div>
        <div className="col-12 col-sm-4 mb-4">
          <SmallStats data={SmallStatData} label="User Online" value="30" />
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
