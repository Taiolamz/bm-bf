import { useState } from "react";
import { RevvexButton } from "../../../../../buttons/button";
import TableBody from "../../../../../table/tableBody/table-body";
import TableContainer from "../../../../../table/tableContainer/main/table-container";
import DashboardLayout from "../../../layout/dashboardLayout/dashboard-layout";
import "./roles.css";
import { PenEditIcon } from "../../../../../../assets/icons/icons";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Roles = () => {
  const [indexNo, setIndexNo] = useState<any>("");
  const navigate = useNavigate();

  const tableHeadList = [
    "Date Created",
    "Role Name",
    "Desription",
    "Users",
    "Action",
  ];

  const tableBodyList = [
    {
      date_created: "Sep 8: 9:40AM",
      role_name: "Admin",
      description: "Limited functions are permitted",
      users: "02",
    },
    {
      date_created: "Sep 8: 9:40AM",
      role_name: "Manager",
      description: "Approve, invite users & attend to support",
      users: "05",
    },
    {
      date_created: "Sep 8: 9:40AM",
      role_name: "Reporter",
      description: "All functions are permitted",
      users: "05",
    },
    {
      date_created: "Sep 8: 9:40AM",
      role_name: "Super Admin",
      description: "Limited functions are permitted",
      users: "05",
    },
    {
      date_created: "Sep 8: 9:40AM",
      role_name: "Reporter",
      description: "All functions are permitted",
      users: "05",
    },
    {
      date_created: "Sep 8: 9:40AM",
      role_name: "Super Admin",
      description: "Limited functions are permitted",
      users: "05",
    },
    {
      date_created: "Sep 8: 9:40AM",
      role_name: "Reporter",
      description: "All functions are permitted",
      users: "05",
    },
    {
      date_created: "Sep 8: 9:40AM",
      role_name: "Super Admin",
      description: "Limited functions are permitted",
      users: "05",
    },
  ];
  return (
    <DashboardLayout pageTitle="Roles & Permissions" goBack>
      <div className="roles-wrap">
        <div className="title-wrap">
          <p className="title">Roles</p>
          <RevvexButton
            label="Add New Role"
            plusIcon
            plusIconColor={"#ffff"}
            btnClassName="add-btn"
            onClick={() => navigate("/dashboard-roles-create")}
          />
        </div>

        {/* table wrap start */}
        <TableContainer
          tableHeadItems={tableHeadList}
          showPagination
          dontShowserialNo
          className="roles-table-wrap"
        >
          {tableBodyList.map((chi, idx) => {
            const { date_created, role_name, description, users } = chi;
            return (
              <TableBody
                dontShowserialNo
                showOddEvenBody
                key={idx}
                num={idx}
                one={date_created}
                two={role_name}
                three={description}
                four={users}
                action
                indexNo={indexNo}
                setIndexNo={() => setIndexNo(idx)}
                viewText={"Remove User"}
                // check the component to confirm assigned props
                reminderText={"Edit Role"}
                editIcon={PenEditIcon}
                deactiveIcon={<FaCheck />}
                cancelSubText={"Deactivate Role"}
              />
            );
          })}
        </TableContainer>
        {/* table wrap end */}
      </div>

      {/* table start */}
      {/* table end */}
    </DashboardLayout>
  );
};
export default Roles;
