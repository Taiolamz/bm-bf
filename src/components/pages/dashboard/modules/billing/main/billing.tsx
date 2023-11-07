import Select from "react-select";
import DashboardLayout from "../../../layout/dashboardLayout/dashboard-layout";
import { BillingChart } from "../chart/chart";
import "./billing.css";
import BillingTable from "../table/billing-table";
import { useDispatch, useSelector } from "react-redux";
import RootState from "../../../../../../redux/types";
import { getBillings } from "../../../../../../redux/Billing";
import { useEffect } from "react";

const Billing = () => {
  const dispatch = useDispatch();
  const perPage = 10;
  const {  billing } = useSelector((state: RootState) => state.billing);

  useEffect(() => {
    getAllBillingsFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllBillingsFunc = async (obj?: any) => {
    const objVal = {
      year: "",
      search: "",
      month: "",
      status: "",
      payment_method: "",
      per_page: perPage,
    };
    dispatch(getBillings(obj || objVal) as any);
    //  console.log(data);
  };

  return (
    <DashboardLayout pageTitle="Billings" goBack>
      <div
        onClick={() => {
          console.log(billing);
        }}
        className="billing-wrap"
      >
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
        <BillingTable  />
        {/* table-wrap end */}

        {/* chart-wrap end */}
      </div>
    </DashboardLayout>
  );
};
export default Billing;
