import { useContext, useState } from "react";
import { ReportIcon } from "../../../../../../assets/icons/icons";
import { RevvexButton } from "../../../../../buttons/button";
import DashboardLayout from "../../../layout/dashboardLayout/dashboard-layout";
import "./user-log.css";
import Tabs from "../../../../../tab/tab";
import Search from "../../../../../table/tableContainer/search/search";
import TableContainer from "../../../../../table/tableContainer/main/table-container";
import TableBody from "../../../../../table/tableBody/table-body";
import Select from "react-select";
import { FaPlus } from "react-icons/fa";
import ReportGenerateModal from "../../subscription/modal/reportGenerateModal/report-generate-modal";
import Modal from "react-awesome-modal";
import AwesomeModal from "react-awesome-modal";
import NewAdmin from "../modal/create/create";
import ActionContext from "../../../../../context/actionContext";
import { capitalizeFirstWord } from "../../../../../helpers/helpers";

const UsersLog = () => {
  const [showModal, setShowModal] = useState(false);
  const [tabSelect, setTabSelect] = useState<string>("active users");
  const [search, setSearch] = useState("");
  const [showCreateAdminModal, setShowCreateAdminModal] = useState(false);
  const [indexNo, setIndexNo] = useState<any>("");
  const actionCtx = useContext(ActionContext);

  const tabItems = ["active users", "inactive users", "admin users"];
  const handleTabSelect = (tab: string) => {
    setTabSelect(tab);
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

  const tableHeadList = [
    "Username",
    "Organisation",
    "Subscription Type",
    "Email Address",
    "Role",
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
              icon={<FaPlus />}
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
          <Select placeholder="sort" />
        </Tabs>

        {/* mid tab-wrap end */}

        {/* bottom table wrap start */}
        <TableContainer tableHeadItems={tableHeadList} showPagination>
          {tableBodyList.map((chi, idx) => {
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
                viewText="View"
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
    </DashboardLayout>
  );
};
export default UsersLog;
