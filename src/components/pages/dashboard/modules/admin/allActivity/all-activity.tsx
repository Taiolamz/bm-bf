import "./all-activity.css";
import Search from "../../../../../table/tableContainer/search/search";
import DashboardHomeReuseTable from "../reuseTable/reuse-table";
import StartUpIcon from "../../../../../../assets/start-up-icon.svg";
import LargeOrgIcon from "../../../../../../assets/large-org-icon.svg";
import DashboardLayout from "../../../layout/dashboardLayout/dashboard-layout";
import { useState } from "react";

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

const AllActivity = () => {
  const tableHeadList = [
    "User",
    "Organization",
    "Action",
    "Status",
    "Date",
    "Time",
  ];

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

  return (
    <DashboardLayout goBack pageTitle="Back">
      <div className="all-activity-wrap">
        <div className="top-wrap">
          <p className="title">All Activity</p>
          <Search
            handleSearchTable={(e: any) => {
              setSearch(e);
            }}
            searchValue={search}
            className="search-input"
          />
        </div>
        {/* table wrap start */}
        <DashboardHomeReuseTable
          tableHeadItem={tableHeadList}
          tableBodyItems={tableBodyList}
          className="table-wrap"
        />
        {/* table wrap end */}
      </div>
    </DashboardLayout>
  );
};
export default AllActivity;
