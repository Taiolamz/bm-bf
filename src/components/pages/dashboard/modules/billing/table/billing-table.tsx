import { useState } from "react";
import "./billing-table.css";
import Search from "../../../../../table/tableContainer/search/search";
import Select from "react-select";
import TableContainer from "../../../../../table/tableContainer/main/table-container";
import BankIcon from "../../../../../../assets/bank-icon.svg";
import TableBody from "../../../../../table/tableBody/table-body";

const BillingTable = () => {
  const tableHeadList = [
    "Company Name",
    "Email",
    "Payment Method",
    "Plan Type",
    "Plan Start Date",
    "Plan End Date",
    "Action",
  ];

  const tableBodyList = [
    {
      company_name: "Microsoft",
      email: "microsoft@gmail.com",
      payment_method: {
        icon: BankIcon,
        name: "Bank Transfer",
      },
      plan_type: "SME",
      plan_start_date: "25-12-2022",
      plan_end_date: "25-12-2023",
    },
    {
      company_name: "Microsoft",
      email: "microsoft@gmail.com",
      payment_method: {
        icon: BankIcon,
        name: "Bank Transfer",
      },
      plan_type: "SME",
      plan_start_date: "25-12-2022",
      plan_end_date: "25-12-2023",
    },
    {
      company_name: "Microsoft",
      email: "microsoft@gmail.com",
      payment_method: {
        icon: BankIcon,
        name: "Bank Transfer",
      },
      plan_type: "SME",
      plan_start_date: "25-12-2022",
      plan_end_date: "25-12-2023",
    },
  ];
  const [search, setSearch] = useState("");
  return (
    <div className="billing-table-wrap">
      <div className="table-top-wrap">
        {/* search wrap start */}

        <Search
          handleSearchTable={(e: any) => {
            setSearch(e);
          }}
          searchValue={search}
          className="search-input"
          placeholder={"search"}
        />
        {/* search wrap end */}

        {/* filter export wrap start */}
        <p>Advanced Filter</p>
        <Select placeholder="Filter" />
        {/* filter export wrap end */}
      </div>

      {/* bottom-table-wrap start */}
      <TableContainer tableHeadItems={tableHeadList}>
        {tableBodyList.map((chi, idx) => {
          const {
            company_name,
            email,
            payment_method,
            plan_type,
            plan_start_date,
            plan_end_date,
          } = chi;
          return (
            <TableBody
              key={idx}
              num={idx}
              one={company_name}
              payment={payment_method.name}
              paymentIcon={payment_method.icon}
              two={email}
              three={plan_type}
              four={plan_start_date}
              five={plan_end_date}
              action
            />
          );
        })}
      </TableContainer>
      {/* bottom-table-wrap end */}
    </div>
  );
};
export default BillingTable;
