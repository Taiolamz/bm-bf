import { IoIosArrowDown } from "react-icons/io";
import DashboardLayout from "../../layout/dashboardLayout/dashboard-layout";
import { RevvexButton } from "../../../../buttons/button";
import "./report.css";
import TableContainer from "../../../../table/tableContainer/main/table-container";
import TableBody from "../../../../table/tableBody/table-body";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";
import {
  DateIcon,
  ReportIcon,
  SetIcon,
} from "../../../../../assets/icons/icons";
import { FaCheck } from "react-icons/fa";
import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ReportGenerateModal from "../subscription/modal/reportGenerateModal/report-generate-modal";
import Modal from "react-awesome-modal";
import ActionContext from "../../../../context/actionContext";
import moment from "moment";
import { exportReports, getReports } from "../../../../../redux/Report";
import { useDispatch, useSelector } from "react-redux";
import RootState from "../../../../../redux/types";
import { Dna } from "react-loader-spinner";

interface DetailsType {
  start_date: string;
  end_date: string;
  check_pdf: boolean;
  check_csv: boolean;
  report_type: string;
}

const Report = () => {
  const dispatch = useDispatch();
  const [selectedReport, setSelectedReport] = useState<any | {}>({
    label: "billing report",
    value: "billing",
  });
  const [showReportsDrop, setShowReportsDrop] = useState(false);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [applyLoader, setApplyLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState({ start_date: "", end_date: "" });
  const actionCtx = useContext(ActionContext);
  const { loading, reports, next_page, prev_page, loadingStatus } = useSelector(
    (state: RootState) => state.reports
  );

  // report modal details
  const [details, setDetails] = useState<DetailsType>({
    start_date: "",
    end_date: "",
    check_pdf: false,
    check_csv: false,
    report_type: "",
  });

  const tableHeadList = [
    "Invoice Number",
    "Customer Name",
    "Date Paid",
    "Due Date",
    "Total Amount",
    "Status",
  ];

  const productHeadList = [
    "Date",
    "Active Users",
    "New Sign-ups",
    "Process Completed",
    "Efficiency %",
  ];

  const landingPageHeadList = [
    "Landing Page Name",
    "Visitors",
    "Click-Through Rate (%)",
    "Conversion Rate",
    "Bounce Rate",
    "Reveneu Generated ($)",
  ];

  const userActivityHeadList = [
    "User ID",
    "User Name",
    "Login Date",
    "Logout Date",
    "Pages Viewed",
    "Action Taken",
  ];

  const conversionHeadList = [
    "Date",
    "Landing Page Visits",
    "Conversion Actions",
    "Conversion Rate",
  ];

  const subscriptionHeadList = [
    "Month-Year",
    "New Subscribers",
    "Non Subscribers",
    "Total Subscribers",
    "Monthly Revenue ($)",
  ];

  const reportOptions = [
    { label: "billing report", value: "billing" },
    { label: "product usage report", value: "product-usage" },
    { label: "landing page report", value: "landing-page" },
    { label: "user activity report", value: "user-activity" },
    { label: "conversion report", value: "conversion" },
    { label: "subscription report", value: "subscription" },
  ];

  const reportTableHeadMapping: any = {
    billing: tableHeadList,
    "product-usage": productHeadList,
    "landing-page": landingPageHeadList,
    "user-activity": userActivityHeadList,
    conversion: conversionHeadList,
  };

  const handleGetReports = async () => {
    const obj: any = {
      report_type: selectedReport.value,
    };
    await dispatch(getReports(obj) as any);
  };

  useEffect(() => {
    handleGetReports();
  }, [selectedReport]);

  const handlePagination = async (param: any) => {
    const url = new URL(param);
    const searchParams = url.searchParams;
    const pageValue = searchParams.get("page");
    const obj: any = {
      report_type: selectedReport.value,
      per_page: 10,
      //   search: search,
      page: pageValue,
    };
    dispatch(getReports(obj) as any);
  };
  const handleShowModalOpen = () => {
    setShowModal(true);
    actionCtx.setIsModalOut(true);
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

  const handleSelectedReport = (report: {}) => {
    setSelectedReport(report);
    if (report) {
      setShowReportsDrop(!showReportsDrop);
    }
  };
  // this function maintains the details state
  const handleShowModalCancel = () => {
    setShowModal(false);
    actionCtx.setIsModalOut(false);
  };

  const addZeroPrefix = (num: any) => {
    let val: any = num + 1 < 10 ? `0${num}` : num;
    return val;
  };

  const showMonthYear = (dateVal: any) => {
    const dateString = dateVal;

    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
    });
    return formattedDate;
  };

  const activateApplyBtn = () => {
    let btn: any = false;
    btn = date.start_date && date.end_date;
    return btn;
  };

  const handleGenerateReport = async () => {
    const obj: any = {
      export_type: details?.report_type,
      report_type: selectedReport.value,
    };
    const data = await dispatch(exportReports(obj) as any);
    // const url = data?.payload.data.download_url;
    if (data?.payload?.status === 200) {
      console.log(data);
      //   window.open(url, "_blank")?.focus();
      //   handleShowModalClose();
    }
  };

  return (
    <DashboardLayout pageTitle="Reports" goBack>
      {/* report wrap start */}
      <div className="report-wrap">
        {/* report top wrap start */}
        <div className="top-wrap">
          {/* left-wrap start */}
          <div
            className="title-wrap"
            onClick={() => setShowReportsDrop(!showReportsDrop)}
          >
            <p className="report-title">{selectedReport.label}</p>
            <IoIosArrowDown
              className={`drop-icon ${showReportsDrop && "icon-up"}`}
            />
          </div>

          {/* report dropdown wrap start */}
          {showReportsDrop && (
            <div className="report-drop">
              {reportOptions.map((chi: any, idx: any) => {
                const { label, value } = chi;
                return (
                  <div
                    onClick={() => handleSelectedReport(chi)}
                    key={idx}
                    className={`reports-box ${
                      selectedReport.value === value && "report-active"
                    }`}
                  >
                    <p>{label}</p>
                    {selectedReport.value === value && (
                      <FaCheck className="icon" />
                    )}
                  </div>
                );
              })}
            </div>
          )}
          {/* report dropdown wrap end */}
          {/* left-wrap end */}

          {/* right-wrap start */}
          <div className="report-btn-wrap">
            <RevvexButton
              btnClassName={`set-date-btn ${
                showDateFilter && "set-date-btn-filter"
              }`}
              label={!showDateFilter && "Set Date Range"}
              icon={!showDateFilter && SetIcon}
              onClick={() => setShowDateFilter(true)}
            >
              {showDateFilter && (
                <>
                  <div className={`date-wrap`}>
                    {/* start date wrap start */}
                    <div className="date-box">
                      <Flatpickr
                        placeholder="Start Date"
                        id="start_date"
                        name="start_date"
                        className="date-field"
                        onChange={(date: any) => {
                          setDate((prev: any) => {
                            return {
                              ...prev,
                              start_date: moment(date[0]).format("YYYY-MM-DD"),
                            };
                          });
                        }}
                      />
                      <label htmlFor="start_date">{DateIcon}</label>
                    </div>
                    {/* start date wrap end */}
                    <p>⸺</p>
                    {/* end date wrap start */}
                    <div className="date-box">
                      <Flatpickr
                        placeholder="End Date"
                        id="end_date"
                        name="end_date"
                        className="date-field"
                        onChange={(date: any) => {
                          setDate((prev: any) => {
                            return {
                              ...prev,
                              end_date: moment(date[0]).format("YYYY-MM-DD"),
                            };
                          });
                        }}
                      />
                      <label className="label-two" htmlFor="end_date">
                        {DateIcon}
                      </label>
                    </div>
                    {/* end date wrap end */}
                  </div>
                  {applyLoader ? (
                    <Dna width={40} />
                  ) : (
                    <p
                      className={`apply-btn ${
                        !activateApplyBtn() && "apply-btn-disable"
                      }`}
                    >
                      Apply
                    </p>
                  )}
                </>
              )}
            </RevvexButton>

            <RevvexButton
              btnClassName="generate-btn"
              label="Generate Report"
              icon={<ReportIcon activeColor={"#ffff"} />}
              onClick={handleShowModalOpen}
            />
          </div>
        </div>

        {/* bottom wrap start*/}
        <div className="table-wrap">
          <TableContainer
            tableHeadItems={
              reportTableHeadMapping[selectedReport?.value] ||
              subscriptionHeadList
            }
            showPagination
            fromPage={reports?.from || 1}
            toPage={reports?.to || reports?.data?.length}
            totalPage={reports?.total || reports?.data?.length}
            nextPage={next_page}
            prevPage={prev_page}
            onNextPage={() => handlePagination(next_page)}
            onPrevPage={() => handlePagination(prev_page)}
          >
            {reports?.data?.map((chi: any, idx: any) => {
              const {
                invoice_num,
                company_name,
                bill_date,
                due_date,
                total_amount,
                status,
                date,
                active_users,
                efficiency,
                new_signups,
                processess_completed,
                action_taken,
                logged_in,
                last_seen,
                user,
                new_subscribers,
                non_subscribers,
                revenue,
                total_subscribers,
              } = chi;
              return (
                <TableBody
                  key={idx}
                  num={idx}
                  one={
                    selectedReport?.value === "product-usage"
                      ? date
                        ? moment(date).format("YYYY - MM - DD")
                        : "__ __"
                      : selectedReport?.value === "user-activity"
                      ? String(addZeroPrefix(user?.id))
                      : selectedReport?.value === "subscription"
                      ? showMonthYear(moment(date).format("YYYY-MM-DD"))
                      : ""
                  }
                  two={
                    selectedReport?.value === "product-usage"
                      ? String(addZeroPrefix(active_users))
                      : selectedReport?.value === "user-activity"
                      ? `${user?.first_name} ${user?.last_name}`
                      : selectedReport?.value === "subscription"
                      ? String(addZeroPrefix(new_subscribers))
                      : ""
                  }
                  three={
                    selectedReport?.value === "product-usage"
                      ? String(addZeroPrefix(new_signups))
                      : selectedReport?.value === "user-activity"
                      ? logged_in
                        ? moment(logged_in).format("YYYY - MM - DD")
                        : "__ __"
                      : selectedReport?.value === "subscription"
                      ? String(addZeroPrefix(non_subscribers))
                      : ""
                  }
                  four={
                    selectedReport?.value === "product-usage"
                      ? String(addZeroPrefix(processess_completed))
                      : selectedReport?.value === "user-activity"
                      ? last_seen
                        ? moment(last_seen).format("YYYY - MM - DD")
                        : "__ __"
                      : selectedReport?.value === "subscription"
                      ? String(addZeroPrefix(total_subscribers))
                      : ""
                  }
                  five={
                    selectedReport?.value === "product-usage"
                      ? String(addZeroPrefix(efficiency))
                      : selectedReport?.value === "user-activity"
                      ? `__ __`
                      : selectedReport?.value === "subscription"
                      ? String(addZeroPrefix(revenue))
                      : ""
                  }
                  six={
                    selectedReport?.value === "user-activity"
                      ? String(addZeroPrefix(action_taken))
                      : ""
                  }
                  //   status={status}
                  statusNoBg
                  loading={loading}
                />
              );
            })}
          </TableContainer>
        </div>
        {/* bottom wrap end*/}
      </div>
      {/* report wrap end */}

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
    </DashboardLayout>
  );
};
export default Report;
