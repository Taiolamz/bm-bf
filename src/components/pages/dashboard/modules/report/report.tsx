import { IoIosArrowDown } from "react-icons/io";
import DashboardLayout from "../../layout/dashboardLayout/dashboard-layout";
import { RevvexButton } from "../../../../buttons/button";
import "./report.css";
import TableContainer from "../../../../table/tableContainer/main/table-container";
import TableBody from "../../../../table/tableBody/table-body";
import { ReportIcon, SetIcon } from "../../../../../assets/icons/icons";
import { FaCheck } from "react-icons/fa";
import { ReactNode, useContext, useRef, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ReportGenerateModal from "../subscription/modal/reportGenerateModal/report-generate-modal";
import Modal from "react-awesome-modal";
import ActionContext from "../../../../context/actionContext";

// type ValuePiece = Date | null;
// type Value = ValuePiece | [ValuePiece, ValuePiece];

const Report = () => {
  const tableHeadList = [
    "Invoice Number",
    "Customer Name",
    "Biiling Date",
    "Due Date",
    "Total Amount",
    "Status",
  ];

  const tableBodyList = [
    {
      invoice_num: "INV-2023-001",
      company_name: "Microsoft",
      bill_date: "06/07/2022",
      due_date: "07/07/2023",
      total_amount: "50,000",
      status: "Paid",
    },
    {
      invoice_num: "INV-2023-002",
      company_name: "XYZ Company",
      bill_date: "06/07/2022",
      due_date: "07/07/2023",
      total_amount: "50,000",
      status: "Pending",
    },
  ];

  const reportOptions = [
    "billing report",
    "product usage report",
    "landing page report",
    "user activity report",
    "conversion report",
    "subscription report",
  ];

  const [selectedReport, setSelectedReport] = useState("billing report");
  const [showReportsDrop, setShowReportsDrop] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const actionCtx = useContext(ActionContext);
  const [indexNo, setIndexNo] = useState<any>("");

  //   const [value, onChange] = useState<Value>(new Date());
  //   const [date, onChange] = useState<any>(new Date());

  //   const handleDateChange = () => {
  //     setDate(date);
  //   };

  const handleShowModalOpen = () => {
    setShowModal(true);
    actionCtx.setIsModalOut(true);
    setIndexNo(false);
  };

  const handleShowModalClose = () => {
    setShowModal(false);
    actionCtx.setIsModalOut(false);
  };

  const handleSelectedReport = (report: string) => {
    setSelectedReport(report);
    if (report) {
      setShowReportsDrop(!showReportsDrop);
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
            <p className="report-title">{selectedReport}</p>
            <IoIosArrowDown
              className={`drop-icon ${showReportsDrop && "icon-up"}`}
            />
          </div>

          {/* report dropdown wrap start */}
          {showReportsDrop && (
            <div className="report-drop">
              {reportOptions.map((chi: any, idx) => (
                <div
                  onClick={() => handleSelectedReport(chi)}
                  key={idx}
                  className={`reports-box ${
                    selectedReport === chi && "report-active"
                  }`}
                >
                  <p>{chi}</p>
                  {selectedReport === chi && <FaCheck className="icon" />}
                </div>
              ))}
            </div>
          )}
          {/* report dropdown wrap end */}
          {/* left-wrap end */}

          {/* right-wrap start */}
          <div className="report-btn-wrap">
            <RevvexButton
              btnClassName="set-date-btn"
              label={"Set Date Range"}
              icon={SetIcon}
            />
            <RevvexButton
              btnClassName="generate-btn"
              label="Generate Report"
              icon={<ReportIcon activeColor={"#ffff"} />}
              onClick={handleShowModalOpen}
            />
            {/* <Calendar
              //   value={value}
              value={date}
              onChange={onChange}
              className={"report-calender"}
            /> */}
          </div>
          {/* <p>{date}</p> */}
          {/* right-wrap end */}
        </div>

        {/* bottom wrap start*/}
        <div className="table-wrap">
          <TableContainer tableHeadItems={tableHeadList} showPagination>
            {tableBodyList.map((chi, idx) => {
              const {
                invoice_num,
                company_name,
                bill_date,
                due_date,
                total_amount,
                status,
              } = chi;
              return (
                <TableBody
                  key={idx}
                  num={idx}
                  one={invoice_num}
                  two={company_name}
                  three={bill_date}
                  four={due_date}
                  five={total_amount}
                  status={status}
                  statusNoBg
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
        onClickAway={handleShowModalClose}
      >
        <ReportGenerateModal />
      </Modal>
      {/* report generate modal end */}
    </DashboardLayout>
  );
};
export default Report;
