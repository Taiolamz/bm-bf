import "./admin-main-table.css";
import StartUpIcon from "../../../../../../assets/start-up-icon.svg";
import LargeOrgIcon from "../../../../../../assets/large-org-icon.svg";
import { Pagination } from "../../../../../table/tableContainer/pagination/pagination";
import { useState } from "react";
import Search from "../../../../../table/tableContainer/search/search";
import DashboardHomeReuseTable from "../reuseTable/reuse-table";

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

const AdminTable: React.FC = () => {
  const tableHeadList = [
    "User",
    "Organization",
    "Action",
    "Status",
    "Date",
    "Time",
  ];

//  lengthy array to check max-height :)
  const tableBodyList: TableBodyList[] = [
    {
      user: {
        user_name: "Hassan Lamidi",
        user_company: "Microsoft",
      },
      organization: {
        icon: StartUpIcon,
        name: "Start-up",
      },
      action: "New revenue projection",
      status: "successful",
      date: "11/02/23",
      time: "15:25",
    },
    {
      user: {
        user_name: "Hassan Lamidi",
        user_company: "Microsoft",
      },
      organization: {
        icon: LargeOrgIcon,
        name: "Large Corporation",
      },
      action: "New Expenditure projection",
      status: "failed",
      date: "11/02/23",
      time: "15:25",
    },
    {
      user: {
        user_name: "Hassan Lamidi",
        user_company: "Microsoft",
      },
      organization: {
        icon: LargeOrgIcon,
        name: "Large Corporation",
      },
      action: "New revenue projection",
      status: "succesfull",
      date: "11/02/23",
      time: "15:25",
    },
    {
      user: {
        user_name: "Hassan Lamidi",
        user_company: "Microsoft",
      },
      organization: {
        icon: StartUpIcon,
        name: "Start-up",
      },
      action: "New Expenditure projection",
      status: "failed",
      date: "11/02/23",
      time: "15:25",
    },
    {
      user: {
        user_name: "Hassan Lamidi",
        user_company: "Microsoft",
      },
      organization: {
        icon: StartUpIcon,
        name: "Start-up",
      },
      action: "New Expenditure projection",
      status: "failed",
      date: "11/02/23",
      time: "15:25",
    },
    {
      user: {
        user_name: "Hassan Lamidi",
        user_company: "Microsoft",
      },
      organization: {
        icon: StartUpIcon,
        name: "Start-up",
      },
      action: "New Expenditure projection",
      status: "failed",
      date: "11/02/23",
      time: "15:25",
    },
    {
      user: {
        user_name: "Hassan Lamidi",
        user_company: "Microsoft",
      },
      organization: {
        icon: StartUpIcon,
        name: "Start-up",
      },
      action: "New Expenditure projection",
      status: "failed",
      date: "11/02/23",
      time: "15:25",
    },
    {
      user: {
        user_name: "Hassan Lamidi",
        user_company: "Microsoft",
      },
      organization: {
        icon: StartUpIcon,
        name: "Start-up",
      },
      action: "New Expenditure projection",
      status: "failed",
      date: "11/02/23",
      time: "15:25",
    },
    {
      user: {
        user_name: "Hassan Lamidi",
        user_company: "Microsoft",
      },
      organization: {
        icon: StartUpIcon,
        name: "Start-up",
      },
      action: "New Expenditure projection",
      status: "failed",
      date: "11/02/23",
      time: "15:25",
    },
    {
      user: {
        user_name: "Hassan Lamidi",
        user_company: "Microsoft",
      },
      organization: {
        icon: StartUpIcon,
        name: "Start-up",
      },
      action: "New Expenditure projection",
      status: "failed",
      date: "11/02/23",
      time: "15:25",
    },
    {
      user: {
        user_name: "Hassan Lamidi",
        user_company: "Microsoft",
      },
      organization: {
        icon: StartUpIcon,
        name: "Start-up",
      },
      action: "New Expenditure projection",
      status: "failed",
      date: "11/02/23",
      time: "15:25",
    },
  ];

  const [search, setSearch] = useState("");
  const [isSticky, setIsSticky] = useState(false);

  //   handle table scroll
  const handleScroll = (event: any) => {
    if (event.target.scrollTop > 128) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  return (
    <div className="admin-main-table-wrap" onScroll={handleScroll}>
      {/* <div className="admin-main-table-box"> */}
      {/* top box start */}
      <div className="admin-main-table-top-box">
        <div className="title-box">
          <p className="title">Admin Activity</p>
          <p className="activity-text">See All Activity</p>
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
          tableBodyItems={tableBodyList}
          isStickyNav={isSticky}
        />

        {/* table-wrap end */}
      </div>
      {/* bottom tablee box end */}
      {/* </div> */}
    </div>
  );
};

export default AdminTable;
