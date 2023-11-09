import { useContext, useState } from "react";
import {
  ReportIcon,
  SortIcon,
  TrashIcon,
  UserIcon,
} from "../../../../../../assets/icons/icons";
import { RevvexButton } from "../../../../../buttons/button";
import DashboardLayout from "../../../layout/dashboardLayout/dashboard-layout";
import "./user-log.css";
import Tabs from "../../../../../tab/tab";
import Search from "../../../../../table/tableContainer/search/search";
import TableContainer from "../../../../../table/tableContainer/main/table-container";
import TableBody from "../../../../../table/tableBody/table-body";
import { FaCheck } from "react-icons/fa";
import ReportGenerateModal from "../../subscription/modal/reportGenerateModal/report-generate-modal";
import Modal from "react-awesome-modal";
import NewAdmin from "../modal/create/create";
import ActionContext from "../../../../../context/actionContext";
import { capitalizeFirstWord } from "../../../../../helpers/helpers";
import DeleteUser from "../modal/delete-user/delete-user";
import { useNavigate } from "react-router-dom";
import ViewModal from "../../subscription/modal/viewModal/view-modal";

interface SortOptionType {
  label: string;
  is_checked: boolean;
}

const UsersLog = () => {
  const [showModal, setShowModal] = useState(false);
  const [tabSelect, setTabSelect] = useState<string>("active users");
  const [search, setSearch] = useState("");
  const [showCreateAdminModal, setShowCreateAdminModal] = useState(false);
  const [userDeleteModal, setUserDeleteModal] = useState(false);
  const [userActivate, setUserActivate] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [showSortByDrop, setShowSortByDrop] = useState(false);
  const [indexNo, setIndexNo] = useState<any>("");
  const actionCtx = useContext(ActionContext);
  const navigate = useNavigate();

  const tabItems = ["active users", "inactive users", "admin users"];

  const handleTabSelect = (tab: string) => {
    setTabSelect(tab);
    setIndexNo(false);
    setShowSortByDrop(false);
  };

  const handleShowModalOpen = () => {
    setShowModal(true);
    actionCtx.setIsModalOut(true);
    setIndexNo(false);
  };

  const handleShowModalClose = () => {
    setShowModal(false);
    actionCtx.setIsModalOut(false);
  };

  const handleShowCreateAdminModalOpen = () => {
    setShowCreateAdminModal(true);
    actionCtx.setIsModalOut(true);
    setIndexNo(false);
  };
  const handleShowCreateAdminModalClose = () => {
    setShowCreateAdminModal(false);
    actionCtx.setIsModalOut(false);
  };

  const handleActivateUser = () => {
    setUserActivate(!userActivate);
  };

  const handleUserDeleteModalOpen = () => {
    // condition other modals to their respective tab values :)
    if (tabSelect === "admin users") {
      setUserDeleteModal(true);
      actionCtx.setIsModalOut(true);
      setIndexNo(false);
    }
  };

  const handleUserDeleteModalClose = () => {
    setUserDeleteModal(false);
    actionCtx.setIsModalOut(false);
  };

  const handleViewAdminModalOpen = () => {
    setViewModal(true);
    actionCtx.setIsModalOut(true);
    setIndexNo(false);
  };

  const handleViewAdminModalClose = () => {
    setViewModal(false);
    actionCtx.setIsModalOut(false);
  };

  const tableHeadList = [
    "Username",
    "Organisation",
    "Subscription Type",
    "Email Address",
    "Role",
    "Date Added",
    "Action",
  ];

  const adminTableHeadList = [
    "Username",
    "Email Address",
    "Role",
    "Status",
    "Date Added",
    "Action",
  ];

  const tableBodyList = [
    {
      username: "Hassan Lamidi",
      organisation: "Zojatech",
      subscription_type: "SMEs",
      email_address: "hlamidi@zojatech.com",
      role: "Admin",
      date_added: "31/10/2022",
    },
    {
      username: "Hassan Lamidi",
      organisation: "Zojatech",
      subscription_type: "SMEs",
      email_address: "hlamidi@zojatech.com",
      role: "Admin",
      date_added: "31/10/2022",
    },
    {
      username: "Hassan Lamidi",
      organisation: "Zojatech",
      subscription_type: "SMEs",
      email_address: "hlamidi@zojatech.com",
      role: "Admin",
      date_added: "31/10/2022",
    },
    {
      username: "Hassan Lamidi",
      organisation: "Zojatech",
      subscription_type: "SMEs",
      email_address: "hlamidi@zojatech.com",
      role: "Admin",
      date_added: "31/10/2022",
    },
    {
      username: "Hassan Lamidi",
      organisation: "Zojatech",
      subscription_type: "SMEs",
      email_address: "hlamidi@zojatech.com",
      role: "Admin",
      date_added: "31/10/2022",
    },
  ];

  const adminTableBodyList = [
    {
      user_name: "Hassan Lamidi",
      email: "hlamidi@zojatech.com",
      role: "Admin",
      status: "Active",
      date_added: "18/09/2022",
    },
    {
      user_name: "Hassan Lamidi",
      email: "hlamidi@zojatech.com",
      role: "Admin",
      status: "Inactive",
      date_added: "18/09/2022",
    },
    {
      user_name: "Hassan Lamidi",
      email: "hlamidi@zojatech.com",
      role: "Admin",
      status: "Active",
      date_added: "18/09/2022",
    },
  ];

  const [sortOptions, setSortOptions] = useState<SortOptionType[]>([
    {
      label: "All",
      is_checked: false,
    },
    {
      label: "Organisation",
      is_checked: false,
    },
    {
      label: "Role",
      is_checked: false,
    },
    {
      label: "Newest",
      is_checked: false,
    },
    {
      label: "Oldest",
      is_checked: false,
    },
  ]);

  // const handleSort = () => {
  //   const obj = {
  //to get each check values
  //     all:
  //       sortOptions.find((chi) => chi.label === "All")?.is_checked || false,
  //     org: "",
  //   };
  //   console.log(obj);
  // };

  const ActiveBtn = () => {
    const checked = sortOptions.map((chi) => chi.is_checked === true);
    let btn: any = false;
    btn = checked.includes(true);
    return btn;
  };

  return (
    <DashboardLayout pageTitle={"User Logs and Management"} goBack>
      {/* user-log wrap start */}
      <div className="user-log-wrap">
        {/* user-log top wrap start */}
        <div className="top-wrap">
          <p className="text">User Management</p>
          <div className="btn-wrap">
            <RevvexButton
              btnClassName="generate-btn"
              label="Generate Report"
              icon={<ReportIcon activeColor={"var(--blue-color)"} />}
              onClick={handleShowModalOpen}
            />
            <RevvexButton
              btnClassName="add-btn"
              label="New Admin User"
              plusIcon
              plusIconColor={"#ffff"}
              onClick={handleShowCreateAdminModalOpen}
            />
          </div>
        </div>
        {/* user-log top wrap end */}

        {/* mid tab-wrap start */}

        <Tabs
          onTabSelect={handleTabSelect}
          tabItems={tabItems}
          activeTab={tabSelect}
          className={"tab-wrap"}
        >
          <Search
            handleSearchTable={(e: any) => {
              setSearch(e);
            }}
            searchValue={search}
            placeholder="Search for users"
            className="search-input"
          />
          <div className="sort-by-wrap">
            <p
              className="sort-text-wrap"
              onClick={() => setShowSortByDrop(!showSortByDrop)}
            >
              <figure>{SortIcon}</figure>
              Sort
            </p>
            {/* sortby dropdown start */}
            {showSortByDrop ? (
              <div className="sort-by-drop-wrap">
                <p className="header">Sort by</p>
                {sortOptions.map((chi, idx) => {
                  const { label, is_checked } = chi;
                  return (
                    <div key={idx} className="check-box-wrap">
                      <input
                        type="checkbox"
                        id={`${label}_check`}
                        className="check-input"
                        name={`${label}_check`}
                        checked={is_checked}
                        onChange={(e: any) => {
                          setSortOptions((prev) =>
                            prev.map((child) =>
                              child.label === label
                                ? { ...child, is_checked: e.target.checked }
                                : child
                            )
                          );
                        }}
                      />
                      <label htmlFor={`${label}_check`} className="check-label">
                        <span>{label}</span>
                        <figure className="check-square">
                          <FaCheck className="icon" />
                        </figure>
                      </label>
                    </div>
                  );
                })}

                <RevvexButton
                  bgColor={!ActiveBtn() ? "var(--disable-color)" : ""}
                  style={{
                    color: !ActiveBtn() ? "var(--mid-disable-color)" : "",
                    cursor: !ActiveBtn() ? "not-allowed" : "",
                  }}
                  label="Apply"
                />
              </div>
            ) : null}
          </div>
          {/* sortby dropdown end */}
        </Tabs>

        {/* mid tab-wrap end */}

        {/* bottom table wrap start */}
        <TableContainer
          tableHeadItems={
            tabSelect !== "admin users" ? tableHeadList : adminTableHeadList
          }
          showPagination
        >
          {tabSelect !== "admin users"
            ? tableBodyList.map((chi, idx) => {
                const {
                  username,
                  organisation,
                  subscription_type,
                  email_address,
                  role,
                  date_added,
                } = chi;
                return (
                  <TableBody
                    key={idx}
                    num={idx}
                    indexNo={indexNo}
                    one={username}
                    two={organisation}
                    three={subscription_type}
                    four={capitalizeFirstWord(email_address)}
                    five={role}
                    six={date_added}
                    action
                    setIndexNo={() => setIndexNo(idx)}
                    viewText={"View"}
                    onView={() => navigate("/dashboard-users-log-view")}
                    activateUserText={
                      tabSelect === "active users"
                        ? "Deactivate User"
                        : tabSelect === "inactive users"
                        ? "Activate User"
                        : ""
                    }
                    activateUserIcon={
                      tabSelect !== "admin users" ? UserIcon : TrashIcon
                    }
                    handleUserCheck={handleActivateUser}
                    userCheck={userActivate}
                  />
                );
              })
            : adminTableBodyList.map((chi, idx) => {
                const { user_name, email, role, status, date_added } = chi;
                return (
                  <TableBody
                    key={idx}
                    num={idx}
                    indexNo={indexNo}
                    setIndexNo={() => setIndexNo(idx)}
                    one={user_name}
                    two={email}
                    three={role}
                    four={date_added}
                    status={status}
                    onView={handleViewAdminModalOpen}
                    action
                    viewText={"View"}
                    activateUserText="Delete User"
                    activateUserIcon={TrashIcon}
                    handleUserClick={handleUserDeleteModalOpen}
                  />
                );
              })}
        </TableContainer>
        {/* bottom table wrap end */}
      </div>
      {/* user-log wrap end */}

      {/* report generate modal starts */}
      <Modal
        visible={showModal}
        effect="fadeInLeft"
        onClickAway={handleShowModalClose}
      >
        <ReportGenerateModal />
      </Modal>
      {/* report generate modal end */}

      {/* create admin modal start */}
      <Modal visible={showCreateAdminModal} effect="fadeInLeft">
        <NewAdmin onClose={handleShowCreateAdminModalClose} />
      </Modal>
      {/* create admin modal end */}

      {/* delete user modal start */}
      <Modal visible={userDeleteModal} effect="fadeInLeft">
        <DeleteUser onCancel={handleUserDeleteModalClose} />
      </Modal>
      {/* delete user modal end */}

      {/* admin modal view start */}
      <Modal
        visible={viewModal}
        effect="fadeInLeft"
        onClickAway={handleViewAdminModalClose}
      >
        <ViewModal onClose={handleViewAdminModalClose} />
      </Modal>
      {/* admin modal view end */}
    </DashboardLayout>
  );
};
export default UsersLog;
