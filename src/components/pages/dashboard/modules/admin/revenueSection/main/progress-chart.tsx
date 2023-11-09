import { Progress } from "reactstrap";
// import ProgressBar from "../progressBar/progress-bar";
import "./progress-chart.css";

import { ProgressChart } from "../progressBar/progress-bar";
// import ProgressBar from "../progressBar/progress-bar";

const RevenueChart = () => {
  return (
    <div className="progress-chart-wrap">
      <div className="progress-chart-box">
        {/* top-wrap start */}
        <div>
          <p className="revenue-title">Revenue</p>
          <p className="revenue-amount">N955,000,000</p>

          <p className="small-text">
            Graph value in Millions(currency Selected)
          </p>
        </div>
        {/* top-wrap end */}

        {/*  bottom-wrap start*/}
        <div className="progress-bar-wrap">
          <ProgressChart />
        </div>
        {/*  bottom-wrap end*/}
      </div>
    </div>
  );
};
export default RevenueChart;
