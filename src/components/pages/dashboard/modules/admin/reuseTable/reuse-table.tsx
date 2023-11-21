import moment from "moment";
import "./reuse-table.css";
import Skeleton from "react-loading-skeleton";

interface TableBodyItemProps {
  user: {
    user_name: string;
    user_company: string;
  };
  organization: {
    icon: string;
    name: string;
  };
  action: string;
  date: string;
  status: string;
  time: string;
}

interface DashboardReuseTableProps {
  className?: string;
  tableHeadItem: string[];
  isStickyNav?: boolean;
  tableBodyItems: TableBodyItemProps[];
  loading?: Boolean;
}

const DashboardHomeReuseTable = ({
  className,
  tableHeadItem,
  tableBodyItems,
  isStickyNav,
  loading,
}: DashboardReuseTableProps) => {
  return (
    <div className={`main-table-wrap-start ${className}`}>
      <div
        className={`main-table-header ${
          isStickyNav ? "main-table-header-scroll" : ""
        }`}
      >
        {tableHeadItem.map((chi, idx) => (
          <p key={idx} className="main-table-header-cell">
            {chi}
          </p>
        ))}
      </div>
      {tableBodyItems?.map((chi: any, idx: any) => {
        const { user, organization, action, description, date, status, time } =
          chi;
        return (
          <div key={idx} className="main-table-body-box">
            {/* user-wrap start */}
            <div className="main-table-cell">
              <div className="user-wrap ">
                <p>
                  {loading ? (
                    <Skeleton   />
                  ) : (
                    user?.name || "__ __"
                  )}
                </p>
                <p className="user-company">
                  {loading ? (
                    <Skeleton width={50}   />
                  ) : (
                    organization?.name || "__ __"
                  )}
                </p>
              </div>
            </div>
            {/* user-wrap end */}

            {/* organization wrap start */}
            <div className="main-table-cell">
              <div className="org-wrap">
                {loading ? (
                  <Skeleton width={20}   />
                ) : (
                  <img
                    src={organization?.icon}
                    alt="organization"
                    className="icon"
                  />
                )}
                <p className="org-name">
                  {loading ? (
                    <Skeleton width={100}   />
                  ) : (
                    organization?.name || "__ __"
                  )}
                </p>
              </div>
            </div>
            {/* organization end */}
            <p className="main-table-cell">
              {loading ? <Skeleton   /> : description}
            </p>

            {loading ? (
              <div style={{ marginTop: "1rem" }}>
                <Skeleton   />
              </div>
            ) : (
              <p
                className={`main-table-cell status ${
                  status.toLowerCase() === "failed" ? "failed-status" : ""
                }`}
              >
                {status}
              </p>
            )}
            <p className="main-table-cell">
              {loading ? (
                <Skeleton   />
              ) : date ? (
                moment(date).format("YYYY - MM -DD")
              ) : (
                "__ __"
              )}
            </p>
            <p className="main-table-cell">
              {loading ? <Skeleton   /> : time}
            </p>
          </div>
        );
      })}
    </div>
  );
};
export default DashboardHomeReuseTable;
