import { useState } from "react";
import "./billing-table.css";
import Search from "../../../../../table/tableContainer/search/search";
import Select from "react-select";
import TableContainer from "../../../../../table/tableContainer/main/table-container";
import BankIcon from "../../../../../../assets/bank-icon.svg";
import TableBody from "../../../../../table/tableBody/table-body";
import { useSelector } from "react-redux";
import RootState from "../../../../../../redux/types";
import moment from "moment";

const BillingTable = () => {
  const { loading, billing } = useSelector((state: RootState) => state.billing);
  const tableHeadList = [
    "Company Name",
    "Email",
    "Payment Method",
    "Plan Type",
    "Plan Start Date",
    "Plan End Date",
    "Action",
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
        {billing?.billing?.data?.map((chi: any, idx: any) => {
          const {
            email,
            payment_method,
            plan_type,
            plan_start_date,
            plan_end_date,
            attributes,
          } = chi || {};
          return (
            <TableBody
              key={idx}
              num={idx}
              one={attributes?.organization?.company_name || "---"}
              payment={payment_method || "---"}
              paymentIcon={payment_method?.icon || BankIcon}
              two={attributes?.email || "---"}
              three={attributes?.plan_type || "---"}
              four={moment(attributes?.start_date).format("YYYY - MM - DD")}
              five={moment(attributes?.end_date).format("YYYY - MM - DD")}
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
