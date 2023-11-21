import { useContext, useEffect, useState } from "react";
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
import DeleteUser from "../modal/delete-user/delete-user";
import { useNavigate } from "react-router-dom";
import ViewModal from "../../subscription/modal/viewModal/view-modal";
import RootState from "../../../../../../redux/types";
import { useSelector, useDispatch } from "react-redux";
import {
  exportUsersLogReport,
  getSingleUserLog,
  getUsersLog,
  updateUserStatus,
} from "../../../../../../redux/usersLog";
import moment from "moment";
import useDebounce from "../../../../../helpers/useDebounce";

interface SortOptionType {
  label: string;
  is_checked: boolean;
}

interface DetailsType {
  start_date: string;
  end_date: string;
  check_pdf: boolean;
  check_csv: boolean;
  report_type: string;
}

const UsersLog = () => {
  const [showModal, setShowModal] = useState(false);
  const [tabSelect, setTabSelect] = useState<string>("active users");
  const [activeTabType, setActiveTabType] = useState("active");
  const [search, setSearch] = useState("");
  const [showCreateAdminModal, setShowCreateAdminModal] = useState(false);
  const [userDeleteModal, setUserDeleteModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [showSortByDrop, setShowSortByDrop] = useState(false);
  const [singleList, setSingleList] = useState({});
  const [indexNo, setIndexNo] = useState<any>("");
  const {
    loading,
    usersLog,
    prev_page,
    next_page,
    loadingStatus,
    loadingView,
    userLog,
  } = useSelector((state: RootState) => state.userslog);
  const dispatch = useDispatch();
  const actionCtx = useContext(ActionContext);
  const navigate = useNavigate();

  // report modal details
  const [details, setDetails] = useState<DetailsType>({
    start_date: "",
    end_date: "",
    check_pdf: false,
    check_csv: false,
    report_type: "",
  });

  const tabItems = ["active users", "inactive users", "admin users"];
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
    "Date Added",
    "Status",
    "Action",
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

  const handleTabSelect = (tab: string) => {
    setTabSelect(tab);
    if (tab === "active users") {
      setActiveTabType("active");
    } else {
      if (tab === "inactive users") {
        setActiveTabType("inactive");
      } else {
        setActiveTabType("admin");
      }
    }
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
    setDetails({
      start_date: "",
      end_date: "",
      check_pdf: false,
      check_csv: false,
      report_type: "",
    });
  };

  // this function maintains the details state
  const handleShowModalCancel = () => {
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

  const handleViewModalOpen = async (param: any) => {
    const data = await dispatch(getSingleUserLog(param?.id) as any);
    if (data?.payload?.status === 200) {
      if (tabSelect !== "admin users") {
        actionCtx.setIsModalOut(true);
        setViewModal(true);
        setIndexNo(false);
      } else {
        localStorage.setItem("get-admin-user", usersLog);
        navigate("/dashboard-users-log-view");
      }
    }
  };

  const handleViewModalClose = () => {
    setViewModal(false);
    actionCtx.setIsModalOut(false);
  };

  const debounceSearchTerm = useDebounce(search, 1000);

  const handleGetUsersLog = async () => {
    const obj: any = {
      type: activeTabType,
      per_page: 10,
      search: search,
    };
    dispatch(getUsersLog(obj) as any);
  };

  const handlePagination = async (param: any) => {
    setIndexNo(false);
    const url = new URL(param);
    const searchParams = url.searchParams;
    const pageValue = searchParams.get("page");
    const obj: any = {
      type: activeTabType,
      per_page: 10,
      search: search,
      page: pageValue,
    };
    dispatch(getUsersLog(obj) as any);
  };

  const ActiveBtn = () => {
    const checked = sortOptions.map((chi) => chi.is_checked === true);
    let btn: any = false;
    btn = checked.includes(true);
    return btn;
  };

  // update or remove one status field on backend clarification
  const handleUserStatusUpdate = async (
    userId: string,
    userStatus: boolean | string
  ) => {
    const obj: any = {
      user_id: userId,
      filter_status: userStatus,
      status: userStatus,
    };
    const data = await dispatch(updateUserStatus(obj) as any);
    if (data?.payload?.status == 200) {
      setIndexNo(false);
      handleGetUsersLog();
    }
  };
  const handleGenerateReport = async () => {
    const obj: any = {
      report_type: details?.report_type,
      type: activeTabType,
    };
    const data = await dispatch(exportUsersLogReport(obj) as any);
    console.log(data);
    if (data?.payload?.status === 200) {
      handleShowModalClose();
    }
  };

  useEffect(() => {
    handleGetUsersLog();
  }, [tabSelect, debounceSearchTerm]);

  // const handleSort = () => {
  //   const obj = {
  //to get each check values
  //     all:
  //       sortOptions.find((chi) => chi.label === "All")?.is_checked || false,
  //     org: "",
  //   };
  //   console.log(obj);
  // };

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
          fromPage={usersLog?.from || 1}
          toPage={usersLog?.to || usersLog?.data?.length}
          totalPage={usersLog?.total || usersLog?.data?.length}
          nextPage={next_page}
          prevPage={prev_page}
          onNextPage={() => handlePagination(next_page)}
          onPrevPage={() => handlePagination(prev_page)}
          showPagination
        >
          {usersLog?.data?.map((chi: any, idx: any) => {
            const { attributes, id } = chi || {};
            return (
              <TableBody
                key={idx}
                num={idx}
                loading={loading}
                indexNo={indexNo}
                one={`${attributes?.user?.first_name} ${attributes?.user?.last_name}`}
                two={
                  tabSelect !== "admin users"
                    ? attributes?.organisation || "_ _"
                    : attributes?.user?.email
                }
                three={
                  tabSelect !== "admin users"
                    ? attributes?.subscription?.plan
                    : attributes?.user?.role
                }
                four={
                  tabSelect !== "admin users"
                    ? attributes?.user?.email
                    : moment(attributes?.date_created).format("YYYY - MM - DD")
                }
                five={
                  tabSelect !== "admin users" ? attributes?.user?.role : false
                }
                six={
                  tabSelect !== "admin users"
                    ? moment(attributes?.date_created).format("YYYY - MM - DD")
                    : false
                }
                status={
                  tabSelect === "admin users"
                    ? attributes?.status === false
                      ? "inactive"
                      : "active"
                    : false
                }
                action
                setIndexNo={() => setIndexNo(idx)}
                viewText={"View"}
                loadingView={loadingView}
                // onView={() =>
                //   tabSelect !== "admin users"
                //     ? handleViewModalOpen(chi)
                //     : localStorage.setItem("single-admin-user", chi) &&
                //       navigate("/dashboard-users-log-view")
                // }
                onView={() => handleViewModalOpen(chi)}
                activateUserText={
                  tabSelect === "active users"
                    ? "Deactivate User"
                    : tabSelect === "inactive users"
                    ? "Activate User"
                    : "Delete User"
                }
                activateUserIcon={
                  tabSelect !== "admin users" ? UserIcon : TrashIcon
                }
                handleUserCheck={() =>
                  handleUserStatusUpdate(
                    id,
                    attributes?.status === "active" ? "true" : "false"
                  )
                }
                // handleUserCheck={handleActivateUser}
                loadingStatus={loadingStatus}
                handleUserClick={handleUserDeleteModalOpen}
                userCheck={attributes?.status === "active" ? true : false}
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
        onClickAway={handleShowModalCancel}
      >
        <ReportGenerateModal
          startDate={details.start_date}
          endDate={details.end_date}
          checkCsv={details.check_csv}
          checkPdf={details.check_pdf}
          onStartDateChange={(date: any) => {
            setDetails((prev: any) => {
              return {
                ...prev,
                start_date: moment(date[0]).format("YYYY-MM-DD"),
              };
            });
          }}
          onEndDateChange={(date: any) => {
            setDetails((prev: any) => {
              return {
                ...prev,
                end_date: moment(date[0]).format("YYYY-MM-DD"),
              };
            });
          }}
          onCsvChange={(e) =>
            setDetails((prev: any) => {
              return {
                ...prev,
                check_csv: e.target.checked,
                report_type: e.target.checked && "excel",
                check_pdf: false,
              };
            })
          }
          onPdfChange={(e) =>
            setDetails((prev: any) => {
              return {
                ...prev,
                check_pdf: e.target.checked,
                report_type: e.target.checked && "pdf",
                check_csv: false,
              };
            })
          }
          loading={loadingStatus}
          onClose={handleShowModalClose}
          onGenerateReport={handleGenerateReport}
        />
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
        onClickAway={handleViewModalClose}
      >
        <ViewModal
          className="view-user-log-modal-wrap"
          detail={userLog}
          onClose={handleViewModalClose}
        />
      </Modal>
      {/* admin modal view end */}
    </DashboardLayout>
  );
};
export default UsersLog;
