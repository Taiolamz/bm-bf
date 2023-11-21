import { useEffect, useState } from "react";
import { RevvexButton } from "../../../../../buttons/button";
import TableBody from "../../../../../table/tableBody/table-body";
import TableContainer from "../../../../../table/tableContainer/main/table-container";
import DashboardLayout from "../../../layout/dashboardLayout/dashboard-layout";
import "./roles.css";
import { PenEditIcon } from "../../../../../../assets/icons/icons";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import RootState from "../../../../../../redux/types";
import { deleteUserFromRole, getRoles } from "../../../../../../redux/roles";

const Roles = () => {
  const [indexNo, setIndexNo] = useState<any>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, roles, deleteLoading } = useSelector(
    (state: RootState) => state.roles
  );

  const tableHeadList = [
    "Date Created",
    "Role Name",
    "Desription",
    "Users",
    "Action",
  ];

  const handleGetRoles = async () => {
    const obj: any = {};
    await dispatch(getRoles(obj) as any);
  };

  const handleDeleteRole = async (param: any) => {
    const data = await dispatch(deleteUserFromRole(param?.id) as any);
    if (data?.payload?.status === 200) {
      setIndexNo(false);
      handleGetRoles();
    }
  };

  useEffect(() => {
    handleGetRoles();
  }, []);

  return (
    <DashboardLayout pageTitle="Roles & Permissions" goBack>
      <div className="roles-wrap">
        <div className="title-wrap">
          <p className="title" onClick={() => console.log(roles)}>
            Roles
          </p>
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
          {roles?.data?.map((chi: any, idx: any) => {
            const { attributes } = chi;
            return (
              <TableBody
                dontShowserialNo
                showOddEvenBody
                key={idx}
                num={idx}
                one={"_ _"}
                two={attributes?.name}
                three={attributes?.description}
                four={String(attributes?.users)}
                action
                indexNo={indexNo}
                setIndexNo={() => setIndexNo(idx)}
                viewText={"Remove User"}
                // onView listener here works for both to view
                // on other components and to remove the user
                // on this component
                loadingView={deleteLoading}
                onView={() => {
                  handleDeleteRole(chi);
                }}
                loading={loading}
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
