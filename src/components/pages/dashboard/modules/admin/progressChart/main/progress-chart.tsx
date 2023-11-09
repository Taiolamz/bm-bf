import { Progress } from "reactstrap";
// import ProgressBar from "../progressBar/progress-bar";
import "./progress-chart.css";
import { ProgressBar } from "../progressBar/progress-bar";
import { GiProgression } from "react-icons/gi";
import { ProgressWrap } from "../../../../../../../assets/icons/icons";
// import ProgressBar from "../progressBar/progress-bar";

const ProgressChart: any = () => {
  const progressChartItems = [
    {
      value: 255,
      label: "Enterprise",
      color: "#F012DACC",
    },
    {
      value: 40,
      label: "Large",
      color: "#004BFFCC",
    },
    {
      value: 30,
      label: "Medium",
      color: "#0F8028CC",
    },
    {
      value: 20,
      label: "SME",
      color: "#FA159FCC",
    },
  ];
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
          {progressChartItems.map((chi, idx) => {
            const { value, label, color } = chi;
            return (
              <div>
                <ProgressWrap
                  progressColor={color}
                  progressValue={value}
                  className=""
                />
                <p>{label}</p>
              </div>
            );
          })}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: " space-between",
            alignItems: "center",
            textAlign: "center",
          }}
        ></div>
        {/*  bottom-wrap end*/}
      </div>
    </div>
  );
};
export default ProgressChart;
