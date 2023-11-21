import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../../layout/dashboardLayout/dashboard-layout";
import ProgressChart from "../revenueSection/main/progress-chart";
import "./admin.css";
import AdminTable from "../table/admin-main-table";
import { FilterIcon } from "../../../../../../assets/icons/icons";
import TrendsCard from "../trendsSection/main/trends";
import { AreaChart } from "../trendsSection/chart/area-chart";
import { DoughnutChart } from "../trendsSection/chart/doghnut-chart";
import RootState from "../../../../../../redux/types";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardHome } from "../../../../../../redux/dashboardHome";
import { useContext, useEffect } from "react";
import { formatNumberWithComma } from "../../../../../helpers/helpers";
import Skeleton from "react-loading-skeleton";
import DashboardRightSubscriptionBar from "../rightBar/right-subscription-bar";
import ActionContext from "../../../../../context/actionContext";

const Admin = () => {
  const { loading, dashboard_home } = useSelector(
    (state: RootState) => state.dashboard
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const actionCtx = useContext(ActionContext);

  const handleGetDashboard = async () => {
    const obj: any = {};
    dispatch(getDashboardHome(obj) as any);
  };

  useEffect(() => {
    handleGetDashboard();
  }, []);

  const topCardItems = [
    {
      title: "All Organizations",
      number: dashboard_home?.organization_data?.total_organization,
      status_one: "Active",
      status_two: "Inactive",
      status_one_num: dashboard_home?.organization_data?.active_organization,
      status_two_num: dashboard_home?.organization_data?.inactive_organization,
      link: "/dashboard-home-all-organisation",
    },
    {
      title: "Active Subscribers",
      number: dashboard_home?.subscribers?.total_subscribers,
      status_one: "free trial",
      status_two: "Canceled",
      status_one_num: dashboard_home?.subscribers?.trial_subscribers,
      status_two_num: dashboard_home?.subscribers?.inactive_subscribers,
      link: "/dashboard-subscription",
    },
    {
      title: "All Complaints",
      number: "__",
      status_one: "Recieved",
      status_two: "Spam",
      status_one_num: "__ __",
      status_two_num: "__ __",
      link: "/dashboard-support",
    },
  ];

  // revenue chart
  const revenueLabel =
    dashboard_home?.revenue_generated_graph?.subscription_plan_amounts?.map(
      (chi: any) => chi?.name
    );
  const revenueData =
    dashboard_home?.revenue_generated_graph?.subscription_plan_amounts?.map(
      (chi: any) => chi?.amount
    );
  const revenueTotal = dashboard_home?.revenue_generated_graph?.total_amount;

  // profit chart
  const profitLabel =
    dashboard_home?.revenue_generated_graph?.subscription_plan_amounts?.map(
      (chi: any) => chi?.name
    );
  const profitData =
    dashboard_home?.revenue_generated_graph?.subscription_plan_amounts?.map(
      (chi: any) => chi?.amount
    );

  // plan distribution
  const planLabel =
    dashboard_home?.plan_distributed?.subscription_plan_distribution?.map(
      (chi: any) => chi?.name
    );
  const plantData =
    dashboard_home?.plan_distributed?.subscription_plan_distribution?.map(
      (chi: any) => chi?.current_month_count
    );
  const plantTotal = dashboard_home?.plan_distributed?.sum_total;

  return (
    <DashboardLayout>
      <div
        className="admin-main-wrap"
        onClick={() => console.log(dashboard_home)}
      >
        <div className="admin-main-box">
          {/* top-wrap-card start */}
          {/* <p
            className="show-btn"
            // onClick={() => actionCtx?.setMoreSubscribers(true)}
          >
            Show Recent Subscriptions
          </p> */}
          <div className="dashboard-card-top-wrap">
            {topCardItems?.map((chi: any, idx: number) => {
              const {
                title,
                number,
                status_one,
                status_two,
                status_one_num,
                status_two_num,
                link,
              } = chi;
              return (
                <div
                  key={idx}
                  className="card-box"
                  onClick={() => navigate(link)}
                >
                  <p className="card-title">{loading ? <Skeleton /> : title}</p>
                  <div className="card-body-wrap" style={{ width: "100%" }}>
                    <p className="number">
                      {loading ? <Skeleton width={40} /> : number}
                    </p>
                    <div className="status-title-wrap">
                      <div className="status-title-box">
                        <p>{loading ? <Skeleton width={40} /> : status_one}</p>
                        <p>{loading ? <Skeleton width={40} /> : status_two}</p>
                      </div>

                      <div className="status-num-wrap">
                        <p className="status-one-num">
                          {loading ? <Skeleton width={20} /> : status_one_num}
                        </p>
                        <p className="status-two-num">
                          {loading ? <Skeleton width={20} /> : status_two_num}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="border-line"></div>
          {/* top-wrap-card end */}

          {/* mid-layer-wrap start */}
          <div className="mid-layer-wrap">
            <ProgressChart
              loading={loading}
              revenueLabel={revenueLabel}
              revenueData={revenueData}
              totalRevenue={formatNumberWithComma(String(revenueTotal)) || "00"}
            />
            <AdminTable
              tableBodyItems={dashboard_home?.admin_activities}
              loading={loading}
            />
          </div>
          {/* mid-layer-wrap end */}

          <div className="bottom-wrap">
            <div className="title-wrap">
              <p className="title">Trends(Running Balance)</p>
              <div className="filter-wrap">
                <p>Today</p>
                <figure>{FilterIcon}</figure>
              </div>
            </div>

            {/* chartwrap card wrap start */}
            <div className="chart-card-wrap">
              {/* area/line chart start */}
              <TrendsCard label={"Profit"} amount={"N955,000,000"}>
                  <AreaChart />
                <div  className="chart-box" >
                </div>
              </TrendsCard>
              {/* area/line chart end */}

              {/* area/line chart start */}
              <TrendsCard
                loading={loading}
                label={"Plan Distribution"}
                amount={formatNumberWithComma(String(plantTotal))}
              >
                <DoughnutChart planLabels={planLabel} planData={plantData} />
                {/* <DoughnutChart planLabels={} planData={""} /> */}
              </TrendsCard>
              {/* area/line chart end */}
            </div>
            {/* chartwrap  card wrap end */}
          </div>
        </div>
        {/* right subscription bar start */}
        <div className="right-bar">
          <DashboardRightSubscriptionBar />
        </div>
        {/* right subscription bar end */}
      </div>
    </DashboardLayout>
  );
};
export default Admin;
