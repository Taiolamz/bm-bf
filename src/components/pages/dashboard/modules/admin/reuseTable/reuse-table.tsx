import "./reuse-table.css";

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
}

const DashboardHomeReuseTable = ({
  className,
  tableHeadItem,
  tableBodyItems,
  isStickyNav,
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
      {tableBodyItems.map((chi, idx) => {
        const { user, organization, action, date, status, time } = chi;
        return (
          <div key={idx} className="main-table-body-box">
            {/* user-wrap start */}
            <div className="main-table-cell">
              <div className="user-wrap ">
                <p>{user.user_name}</p>
                <p className="user-company">{user.user_company}</p>
              </div>
            </div>
            {/* user-wrap end */}

            {/* organization wrap start */}
            <div className="main-table-cell">
              <div className="org-wrap">
                <img
                  src={organization.icon}
                  alt="organization"
                  className="icon"
                />
                <p className="org-name">{organization.name}</p>
              </div>
            </div>
            {/* organization end */}
            <p className="main-table-cell">{action}</p>
            <p
              className={`main-table-cell status ${
                status.toLowerCase() === "failed" ? "failed-status" : ""
              }`}
            >
              {status}
            </p>
            <p className="main-table-cell">{date}</p>
            <p className="main-table-cell">{time}</p>
          </div>
        );
      })}
    </div>
  );
};
export default DashboardHomeReuseTable;
