import "./progress-chart.css";
import { ProgressChart } from "../progressBar/progress-bar";
import Skeleton from "react-loading-skeleton";

interface RevenueChartProps {
  totalRevenue?: string | any;
  revenueLabel?: string[];
  revenueData?: number[];
  loading?: boolean;
}

const RevenueChart = ({
  totalRevenue,
  revenueData,
  revenueLabel,
  loading,
}: RevenueChartProps) => {
  return (
    <div className="progress-chart-wrap">
      <div className="progress-chart-box">
        {/* top-wrap start */}
        <div>
          <p className="revenue-title">Revenue</p>
          <p className="revenue-amount">
            {loading ? <Skeleton   /> : totalRevenue}
          </p>

          <p className="small-text">
            Graph value in Millions(currency Selected)
          </p>
        </div>
        {/* top-wrap end */}

        {/*  bottom-wrap start*/}
        <div className="progress-bar-wrap">
          <ProgressChart
            loading={loading}
            revenueData={revenueData}
            revenueLabel={revenueLabel}
          />
        </div>
        {/*  bottom-wrap end*/}
      </div>
    </div>
  );
};
export default RevenueChart;
