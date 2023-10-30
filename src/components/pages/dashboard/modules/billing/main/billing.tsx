import Select from "react-select";
import DashboardLayout from "../../../layout/dashboardLayout/dashboard-layout";
import { BillingChart } from "../chart/chart";
import "./billing.css";
import BillingTable from "../table/billing-table";

const Billing = () => {
  return (
    <DashboardLayout pageTitle="Billings" goBack>
      <div className="billing-wrap">
        <div className="top-billing-wrap">
          <p className="title">Total Transaction</p>
          <p className="amount">900K</p>
        </div>
        {/* chart-wrap start */}
        <div className="chart-bar-wrap">
          <div className="top-chart-wrap">
            <p className="title">Transaction Activity</p>
            <Select />
          </div>
          <BillingChart />
          <div className="bottom-chart-label">
            <div className="label-wrap">
              <span className="label-inflow"></span>
              <p className="label">Inflow</p>
            </div>
            <div className="label-wrap">
              <span className="label-outflow"></span>
              <p className="label">Outflow</p>
            </div>
          </div>
        </div>

        {/* table-wrap start */}
        <BillingTable />
        {/* table-wrap end */}

        {/* chart-wrap end */}
      </div>
    </DashboardLayout>
  );
};
export default Billing;
