import { useState } from "react";
import TableBody from "../../../../../table/tableBody/table-body";
import TableContainer from "../../../../../table/tableContainer/main/table-container";
import Search from "../../../../../table/tableContainer/search/search";
import DashboardLayout from "../../../layout/dashboardLayout/dashboard-layout";
import Select from "react-select";
import "./all-organisation.css";
import { reactSelectStyle } from "../../../../../helpers/select-style";

interface SelectOptions {
  label: string;
  value: string;
}

const AllOrganisation = () => {
  const tableHeadList = [
    "Organization Name",
    "Email",
    "Subscription Plan",
    "Due_Date",
    "Signed_up",
    "Status",
  ];

  const allOrganizationItems = [
    {
      organisation_name: "Microsoft",
      email: "hlamidi@zojatech.com",
      subscription_plan: "SME",
      due_date: "May 9, 2023",
      signed_up: "May 9, 2023",
      status: "active",
    },
    {
      organisation_name: "Microsoft",
      email: "hlamidi@zojatech.com",
      subscription_plan: "SME",
      due_date: "May 9, 2023",
      signed_up: "May 9, 2023",
      status: "Inactive",
    },
    {
      organisation_name: "Microsoft",
      email: "hlamidi@zojatech.com",
      subscription_plan: "SME",
      due_date: "May 9, 2023",
      signed_up: "May 9, 2023",
      status: "active",
    },
    {
      organisation_name: "Microsoft",
      email: "hlamidi@zojatech.com",
      subscription_plan: "SME",
      due_date: "May 9, 2023",
      signed_up: "May 9, 2023",
      status: "Inactive",
    },
    {
      organisation_name: "Microsoft",
      email: "hlamidi@zojatech.com",
      subscription_plan: "SME",
      due_date: "May 9, 2023",
      signed_up: "May 9, 2023",
      status: "active",
    },
  ];

  const [search, setSearch] = useState("");
  const [filterBy, setFilterBy] = useState<any>("");
  const [exportBy, setExportBy] = useState<any>("");

  const filterOptions: SelectOptions[] = [
    {
      label: "Organization",
      value: "organization",
    },
    {
      label: "Email",
      value: "email",
    },
    {
      label: "Sunscription Plan",
      value: "subscription_plan",
    },
    {
      label: "Due Date",
      value: "due_date",
    },
    {
      label: "Status",
      value: "status",
    },
  ];

  const exportOptions: SelectOptions[] = [
    {
      label: "PDF",
      value: "pdf",
    },
    {
      label: "Excel",
      value: "excel",
    },
    {
      label: "CSV",
      value: "csv",
    },
  ];

  return (
    <DashboardLayout pageTitle="Back" goBack>
      <div className="all-organization-wrap">
        <div className="top-org-wrap">
          <p className="title">All Organisations</p>
          <p className="text">
            Keep track of all active subscribers record at a glance
          </p>
        </div>
        {/* search and filter wrap start */}
        <div className="search-filter-wrap">
          <Search
            searchValue={search}
            placeholder="search organisation name"
            handleSearchTable={(e) => setSearch(e)}
            className="search-box"
          />

          {/*filter/export wrap start */}
          <div className="select-wrap">
            <Select
              className="select"
              placeholder="Filter table by"
              value={filterBy}
              getOptionLabel={(label: SelectOptions) => label.label}
              getOptionValue={(value: SelectOptions) => value.value}
              onChange={(e: any) => {
                setFilterBy(e);
              }}
              options={filterOptions}
              // styles={reactSelectStyle}
            />
            <Select
              className="select"
              placeholder="Export"
              value={exportBy}
              getOptionLabel={(label: SelectOptions) => label.label}
              getOptionValue={(value: SelectOptions) => value.value}
              onChange={(e: any) => {
                setExportBy(e);
              }}
              options={exportOptions}
            />
          </div>
          {/*filter/export wrap end */}
        </div>

        {/* search and filter wrap end */}
        {/* table-wrap start */}
        <TableContainer tableHeadItems={tableHeadList} showPagination>
          {allOrganizationItems.map((chi, idx) => {
            const {
              organisation_name,
              email,
              subscription_plan,
              status,
              due_date,
              signed_up,
            } = chi;
            return (
              <TableBody
                key={idx}
                num={idx}
                one={organisation_name}
                two={email}
                three={subscription_plan}
                four={due_date}
                five={signed_up}
                status={status}
              />
            );
          })}
        </TableContainer>
        {/* table-wrap end */}
      </div>
    </DashboardLayout>
  );
};

export default AllOrganisation;
