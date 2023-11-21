import { useContext, useEffect, useRef, useState } from "react";
import { NoteIcon } from "../../../../../../assets/icons/icons";
import Tabs from "../../../../../tab/tab";
import DashboardLayout from "../../../layout/dashboardLayout/dashboard-layout";
import "./subscription.css";
import TableBody from "../../../../../table/tableBody/table-body";
import Modal from "react-awesome-modal";
import ReportGenerateModal from "../modal/reportGenerateModal/report-generate-modal";
import ViewModal from "../modal/viewModal/view-modal";
import TableContainer from "../../../../../table/tableContainer/main/table-container";
import ActionContext from "../../../../../context/actionContext";
import { useDispatch, useSelector } from "react-redux";
import {
  executeTypedSubscription,
  exportSubscription,
  getSingleSubscription,
  getSubscriptions,
} from "../../../../../../redux/Subscription";
import RootState from "../../../../../../redux/types";
import moment from "moment";
import Search from "../../../../../table/tableContainer/search/search";
import useDebounce from "../../../../../helpers/useDebounce";

interface DetailsType {
  start_date: string;
  end_date: string;
  check_pdf: boolean;
  check_csv: boolean;
  report_type: string;
}

const Subscription = () => {
  const dispatch = useDispatch();
  const {
    loading,
    subscriptions,
    subscription,
    prev_page,
    next_page,
    loadingStatus,
    loadingView,
  } = useSelector((state: RootState) => state.subscriptions);
  const [tabSelect, setTabSelect] = useState<string>("active subscription");
  const [activeTabType, setActiveTabType] = useState("active");
  const [search, setSearch] = useState("");
  const [indexNo, setIndexNo] = useState<any>("");
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const actionCtx = useContext(ActionContext);

  // report modal details
  const [details, setDetails] = useState<DetailsType>({
    start_date: "",
    end_date: "",
    check_pdf: false,
    check_csv: false,
    report_type: "",
  });

  const tabItems = [
    "active subscription",
    "inactive subscription",
    "pending renewals",
    "free trials",
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

  const handleOpenViewModal = async (param: any) => {
    const data = await dispatch(getSingleSubscription(param?.id) as any);
    if (data?.payload?.status === 200) {
      actionCtx.setIsModalOut(true);
      setShowViewModal(true);
      setIndexNo(false);
    }
  };


  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setIndexNo(false);
    actionCtx.setIsModalOut(false);
  };

  const handleTabSelect = (tab: string) => {
    setIndexNo(false);
    setTabSelect(tab);
    if (tab === "active subscription") {
      setActiveTabType("active");
    } else if (tab === "inactive subscription") {
      setActiveTabType("inactive");
    } else if (tab === "pending renewals") {
      setActiveTabType("pending");
    } else {
      setActiveTabType("trial");
    }
  };

  const debounceSearchTerm = useDebounce(search, 1000);

  const handleGetSubscriptions = async () => {
    const objVal = {
      per_page: 10,
      search: search,
      type: activeTabType,
    };
    dispatch(getSubscriptions(objVal as any) as any);
  };

  // function to handle cancel or send-reminder where
  // exec_type is either cancelled or send-reminder
  const handleTypedSubscription = async (type: any, param: any) => {
    const obj: any = {
      exec_type: type,
      id: param?.id || param?.plan_details?.id,
    };
    const data = await dispatch(executeTypedSubscription(obj) as any);
    if (data?.payload?.status === 200) {
      setIndexNo(false);
      if (showViewModal) {
        handleCloseViewModal();
      }
      handleGetSubscriptions();
    }
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
    dispatch(getSubscriptions(obj) as any);
  };

  const handleGenerateReport = async () => {
    const obj: any = {
      report_type: details?.report_type,
      type: activeTabType,
    };
    const data = await dispatch(exportSubscription(obj) as any);
    const url = data?.payload.data.download_url;
    if (data?.payload?.status === 200 && url) {
      window.open(url, "_blank")?.focus();
      handleShowModalClose();
    }
  };

  useEffect(() => {
    handleGetSubscriptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabSelect, debounceSearchTerm]);

  return (
    <DashboardLayout pageTitle="Subscriptions" goBack>
      {/* subscription-wrap start */}
      <div className="subscription-wrap">
        {/* top subscription wrap start */}
        <div className="top-wrap">
          <p className="subscription-text">Subscription Management</p>

          {/* generate report wrap start */}
          <div className="generate-report-wrap" onClick={handleShowModalOpen}>
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
          >
            <Search
              handleSearchTable={(e: any) => {
                setSearch(e);
              }}
              searchValue={search}
              placeholder="search subscription"
              className="search-input"
            />
          </Tabs>
        </div>

        {/* table-wrap start */}
        <TableContainer
          tableHeadItems={tableHeadList}
          showPagination
          fromPage={subscriptions?.from || 1}
          toPage={subscriptions?.to || subscriptions?.data?.length}
          totalPage={subscriptions?.total || subscriptions?.data?.length}
          nextPage={next_page}
          prevPage={prev_page}
          onNextPage={() => handlePagination(next_page)}
          onPrevPage={() => handlePagination(prev_page)}
        >
          {subscriptions?.data?.map((chi: any, idx: any) => {
            const { attributes, type } = chi;
            return (
              <TableBody
                key={idx}
                num={idx}
                loading={loading}
                indexNo={indexNo}
                one={attributes?.organisation?.name || "_ _"}
                two={attributes?.user?.email}
                three={moment(attributes?.start_date).format("YYYY - MM - DD")}
                four={moment(attributes?.end_date).format("YYYY - MM - DD")}
                five={attributes?.subscription_plan?.title}
                status={attributes?.status}
                setIndexNo={() => setIndexNo(idx)}
                action
                viewText={"View"}
                onView={() => handleOpenViewModal(chi)}
                loadingView={loadingView}
                cancelSubText={
                  type === "active_subscription" ||
                  type === "trail_subscription"
                    ? "Cancel Subscription"
                    : null
                }
                loadingStatus={loadingStatus}
                onCancelSub={() => {
                  handleTypedSubscription("cancel", chi);
                }}
                reminderText={
                  type === "pending_subscription" ||
                  type === "expired_subscription"
                    ? "Send Reminder"
                    : null
                }
                onSendReminder={() =>
                  handleTypedSubscription("send-reminder", chi)
                }
              />
            );
          })}
        </TableContainer>
        {/* table-wrap end */}
        {/*  bottom subscription wrap end*/}
      </div>

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

      {/* view modal start */}
      <Modal
        visible={showViewModal}
        effect="fadeInLeft"
        onClickAway={handleCloseViewModal}
      >
        <ViewModal
          showCancelSub
          showOrgDetailsText
          detail={subscription}
          onClose={handleCloseViewModal}
          loading={loadingStatus}
          onHandleStatus={() => handleTypedSubscription("cancel", subscription)}
        />
      </Modal>
      {/* view modal end */}
      {/* subscription-wrap end */}
    </DashboardLayout>
  );
};
export default Subscription;
