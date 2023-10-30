import { useState } from "react";
import { NoteIcon } from "../../../../../../assets/icons/icons";
import Tabs from "../../../../../tab/tab";
import DashboardLayout from "../../../layout/dashboardLayout/dashboard-layout";
import "./subscription.css";
import TableBody from "../../../../../table/tableBody/table-body";
import { capitalizeFirstWord } from "../../../../../helpers/helpers";
import Modal from "react-awesome-modal";
import ReportGenerateModal from "../modal/reportGenerateModal/report-generate-modal";
import ViewModal from "../modal/viewModal/view-modal";
import TableContainer from "../../../../../table/tableContainer/main/table-container";

const Subscription = () => {
  const [tabSelect, setTabSelect] = useState<string>("Active Subscription");
  const [indexNo, setIndexNo] = useState<any>("");
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const tabItems = [
    "Active Subscription",
    "Inactive Subscription",
    "Pending Renewals",
    "Free Trials",
  ];

  const tableHeadList = [
    "Organisation Name",
    "Email Address",
    "Start date",
    "End date",
    "Subscription Plans",
    "Status",
    "Action",
  ];

  const tableBodyList = [
    {
      organization_name: "Zojatech",
      email_address: "hlamidi@zojatech.com",
      start_date: "16/09/22",
      end_date: "16/09/2023",
      subscription_plans: "SME",
      status: "canceled",
    },
    {
      organization_name: "Microsoft",
      email_address: "lami@ithorizons.com",
      start_date: "05/09/22",
      end_date: "16/09/2023",
      subscription_plans: "Premium",
      status: "Pending",
    },
    {
      organization_name: "Microsoft",
      email_address: "lami@ithorizons.com",
      start_date: "05/09/22",
      end_date: "16/09/2023",
      subscription_plans: "Premium",
      status: "Free Trial",
    },
    {
      organization_name: "Microsoft",
      email_address: "lami@ithorizons.com",
      start_date: "05/09/22",
      end_date: "16/09/2023",
      subscription_plans: "Premium",
      status: "Active",
    },
    {
      organization_name: "Microsoft",
      email_address: "lami@ithorizons.com",
      start_date: "05/09/22",
      end_date: "16/09/2023",
      subscription_plans: "Premium",
      status: "Active",
    },
  ];

  const handleTabSelect = (tab: string) => {
    setTabSelect(tab);
  };
  return (
    <DashboardLayout pageTitle="Subscriptions" goBack>
      {/* subscription-wrap start */}
      <div className="subscription-wrap">
        {/* top subscription wrap start */}
        <div className="top-wrap">
          <p className="subscription-text">Subscription Management</p>

          {/* generate report wrap start */}
          <div
            className="generate-report-wrap"
            onClick={() => setShowModal(true)}
          >
            <p>Generate Report</p>
            <figure>{NoteIcon}</figure>
          </div>
          {/* generate report wrap end */}
        </div>
        {/* top subscription wrap end */}

        {/*  bottom subscription wrap start*/}
        <div className="tab-wrap">
          <Tabs
            onTabSelect={handleTabSelect}
            tabItems={tabItems}
            activeTab={tabSelect}
          />
        </div>

        {/* table-wrap start */}
        <TableContainer tableHeadItems={tableHeadList} showPagination>
          {tableBodyList.map((chi, idx) => {
            const {
              organization_name,
              email_address,
              start_date,
              end_date,
              subscription_plans,
              status,
            } = chi;
            return (
              <TableBody
                key={idx}
                num={idx}
                indexNo={indexNo}
                one={organization_name}
                two={capitalizeFirstWord(email_address)}
                three={start_date}
                four={end_date}
                five={subscription_plans}
                status={status}
                setIndexNo={() => setIndexNo(idx)}
                action
                viewText={"View"}
                onView={() => {
                  setShowViewModal(true);
                  setIndexNo(false);
                }}
                cancelSubText={
                  status.toLowerCase() === "active"
                    ? "Cancel Subscription"
                    : null
                }
                reminderText={
                  status.toLowerCase() !== "active" ? "Send Reminder" : null
                }
              />
            );
          })}
        </TableContainer>
        {/* table-wrap end */}
        {/*  bottom subscription wrap end*/}
      </div>
      {/* report generate modal starts */}
      <Modal visible={showModal} effect="fadeInLeft">
        <ReportGenerateModal setModal={() => setShowModal(false)} />
      </Modal>
      {/* report generate modal end */}

      {/* view modal start */}
      <Modal visible={showViewModal} effect="fadeInLeft">
        <ViewModal onClose={() => setShowViewModal(false)} />
      </Modal>
      {/* view modal end */}
      {/* subscription-wrap end */}
    </DashboardLayout>
  );
};
export default Subscription;
