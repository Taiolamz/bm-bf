import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../../layout/dashboardLayout/dashboard-layout";
import ProgressChart from "../progressChart/main/progress-chart";
import "./admin.css";
import AdminTable from "../table/admin-main-table";

const Admin = () => {
  const topCardItems = [
    {
      title: "All Organizations",
      number: "200",
      status_one: "Active",
      status_two: "Inactive",
      status_one_num: "140",
      status_two_num: "60",
      link: "/dashboard-home-all-organisation",
    },
    {
      title: "Active Subscribers",
      number: "50",
      status_one: "free trial",
      status_two: "Canceled",
      status_one_num: "60",
      status_two_num: "60",
      link: "/dashboard-home-active-subscribers",
    },
    {
      title: "All Complaints",
      number: "12",
      status_one: "Recieved",
      status_two: "Spam",
      status_one_num: "140",
      status_two_num: "60",
      link: "/dashboard-home-all-complaints",
    },
  ];

  const navigate = useNavigate();

  return (
    <DashboardLayout pageTitle={`${"Hi Hassan"}!`}>
      <div className="admin-main-wrap">
        {/* top-wrap-card start */}

        <div className="dashboard-card-top-wrap">
          {topCardItems.map((chi, idx) => {
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
                <p className="card-title">{title}</p>
                <div className="card-body-wrap" style={{ width: "100%" }}>
                  <p className="number">{number}</p>
                  <div className="status-title-wrap">
                    <div className="status-title-box">
                      <p>{status_one}</p>
                      <p>{status_two}</p>
                    </div>

                    <div className="status-num-wrap">
                      <p className="status-one-num">{status_one_num}</p>
                      <p className="status-two-num">{status_two_num}</p>
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
          <ProgressChart />
          <AdminTable />
        </div>
        {/* mid-layer-wrap end */}
      </div>
    </DashboardLayout>
  );
};
export default Admin;
