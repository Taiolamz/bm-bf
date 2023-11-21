import Select from "react-select";
import DashboardLayout from "../../../layout/dashboardLayout/dashboard-layout";
import { BillingChart } from "../chart/chart";
import "./billing.css";
import BillingTable from "../table/billing-table";
import { useDispatch, useSelector } from "react-redux";
import RootState from "../../../../../../redux/types";
import { getBillings } from "../../../../../../redux/Billing";
import { useEffect, useState } from "react";
import useDebounce from "../../../../../helpers/useDebounce";
import { formatNumberWithComma } from "../../../../../helpers/helpers";
import Skeleton from "react-loading-skeleton";
import NoChartContent from "../../../../../helpers/no-chart-content";

const Billing = () => {
  const dispatch = useDispatch();
  const perPage = 10;
  const { billing, loading } = useSelector((state: RootState) => state.billing);
  const [search, setSearch] = useState("");
  const debounceSearchTerm = useDebounce(search, 1000);
  useEffect(() => {
    getAllBillingsFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearchTerm]);

  const getAllBillingsFunc = async (obj?: any) => {
    const objVal = {
      year: "",
      search: search,
      month: "",
      status: "",
      payment_method: "",
      per_page: perPage,
    };
    dispatch(getBillings(obj || objVal) as any);
    //  console.log(data);
  };

  // get graph values >>
  // billing graph label
  const billingLabel = billing?.graph?.map((chi: any) => chi?.month?.label);

  // billing graph data
  const billingData = billing?.graph?.map((chi: any) => chi?.month?.value);

  return (
    <DashboardLayout pageTitle="Billings" goBack>
      <div className="billing-wrap">
        <div className="top-billing-wrap">
          <p className="title">Total Transaction</p>
          <p className="amount">
            {loading ? (
              <Skeleton width={200} />
            ) : billing?.total_transaction ? (
              formatNumberWithComma(String(billing?.total_transaction))
            ) : (
              "__ __"
            )}
          </p>
        </div>
        {/* chart-wrap start */}
        <div className="chart-bar-wrap">
          <div className="top-chart-wrap">
            <p className="title">Transaction Activity</p>
            <Select />
          </div>
          <div className="bottom-chart-box">
            <p>Currency Value</p>
            {loading ? (
              <div style={{ marginBottom: "7rem", width: "100%" }}>
                <NoChartContent moreContent />
              </div>
            ) : (
              <BillingChart
                loading={loading}
                billingLabel={billingLabel}
                billingData={billingData}
              />
            )}
          </div>
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
        <BillingTable
          searchVal={search}
          handleSearchTable={(e: any) => setSearch(e)}
        />
        {/* table-wrap end */}

        {/* chart-wrap end */}
      </div>
    </DashboardLayout>
  );
};
export default Billing;
