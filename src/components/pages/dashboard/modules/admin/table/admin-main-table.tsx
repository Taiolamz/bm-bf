import "./admin-main-table.css";
import StartUpIcon from "../../../../../../assets/start-up-icon.svg";
import LargeOrgIcon from "../../../../../../assets/large-org-icon.svg";
import { Pagination } from "../../../../../table/tableContainer/pagination/pagination";
import { useState } from "react";
import Search from "../../../../../table/tableContainer/search/search";
import DashboardHomeReuseTable from "../reuseTable/reuse-table";
import { useNavigate } from "react-router-dom";

interface TableBodyList {
  user: {
    user_name: string;
    user_company: string;
  };
  organization: {
    icon: string;
    name: string;
  };
  action: string;
  status: string;
  date: string;
  time: string;
}

interface AdminTableProps {
  tableBodyItems: string[] | any;
  loading: boolean;
}

const AdminTable = ({ tableBodyItems, loading }: AdminTableProps) => {
  const navigate = useNavigate();
  const tableHeadList = [
    "User",
    "Organization",
    "Action",
    "Status",
    "Date",
    "Time",
  ];

  const [search, setSearch] = useState("");
  const [isSticky, setIsSticky] = useState(false);

  //   handle table scroll
  const handleScroll = (event: any) => {
    if (event.target.scrollTop > 1) {
      // if (event.target.scrollTop > 128) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  const handleAdminTable = (table: any) => {
    const newData = table?.slice(0, 6);
    return newData;
  };

  return (
    <div className="admin-main-table-wrap" onScroll={handleScroll}>
      {/* <div className="admin-main-table-box"> */}
      {/* top box start */}
      <div className="admin-main-table-top-box">
        <div className="title-box">
          <p className="title">Admin Activity</p>
          <p
            className="activity-text"
            onClick={() => navigate("/dashboard-home-all-activity")}
          >
            See All Activity
          </p>
        </div>
        {/* pagination start */}

        <Pagination />

        {/* pagination end */}
      </div>
      {/* top box end */}
      {/* bottom tablee box start */}
      <div>
        {/* search start */}
        <Search
          handleSearchTable={(e: any) => {
            setSearch(e);
          }}
          searchValue={search}
        />
        {/* search end */}
        {/* table-wrap start */}
        <DashboardHomeReuseTable
          tableHeadItem={tableHeadList}
          tableBodyItems={handleAdminTable(tableBodyItems)}
          isStickyNav={isSticky}
          loading={loading}
        />

        {/* table-wrap end */}
      </div>
      {/* bottom tablee box end */}
      {/* </div> */}
    </div>
  );
};

export default AdminTable;
