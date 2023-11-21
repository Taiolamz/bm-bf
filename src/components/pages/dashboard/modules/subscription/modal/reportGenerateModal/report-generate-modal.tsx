import "./report-generate-modal.css";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";
import { CalenderIcon } from "../../../../../../../assets/icons/icons";
import { RevvexButton } from "../../../../../../buttons/button";
import { FaCheck } from "react-icons/fa";
import { LiaTimesSolid } from "react-icons/lia";
import { Dna } from "react-loader-spinner";

interface ReportModalProps {
  startDate?: string;
  endDate?: string;
  checkPdf?: boolean;
  checkCsv?: boolean;
  onClose?: () => void;
  onGenerateReport?: () => void;
  onStartDateChange?: (date: any) => void;
  onEndDateChange?: (date: any) => void;
  onPdfChange?: (e: any) => void;
  onCsvChange?: (e: any) => void;
  loading?: boolean;
}

const ReportGenerateModal = ({
  startDate,
  endDate,
  checkPdf,
  checkCsv,
  onClose,
  onStartDateChange,
  onEndDateChange,
  onGenerateReport,
  onCsvChange,
  onPdfChange,
  loading,
}: ReportModalProps) => {
  const activateButton = () => {
    let activeBtn: any = false;
    activeBtn = startDate && endDate && (checkPdf || checkCsv);
    return activeBtn;
  };

  return (
    <div className="report-generate-modal-wrap">
      {/* top-wrap start */}
      <div className="top-wrap">
        <div className="title-wrap">
          <p className="title">Generate Report</p>
          <p>Select the start date and end date for your report</p>
        </div>
        <div className="cancel-wrap" onClick={onClose}>
          <LiaTimesSolid className="cancel-icon" />
        </div>
      </div>
      {/* top-wrap end */}

      {/* form wrap start */}
      {/* form-group start */}
      <div className="form-group">
        <label htmlFor="start_date">From</label>
        <Flatpickr
          id="start_date"
          name="start_date"
          className={`date-input ${startDate && "date-input-active"}`}
          autoComplete="off"
          value={startDate}
          onChange={onStartDateChange}
          placeholder="Select Date"
        />
        <label className="icon">{CalenderIcon}</label>
      </div>
      {/* form-group end */}

      {/* form-group start */}
      <div className="form-group">
        <label htmlFor="end_date">To</label>
        <Flatpickr
          id="end_date"
          name="end_date"
          className={`date-input ${endDate && "date-input-active"}`}
          autoComplete="off"
          value={endDate}
          onChange={onEndDateChange}
          placeholder="Select Date"
        />
        <label className="icon">{CalenderIcon}</label>
      </div>
      {/* form-group end */}

      <div className="select-file-wrap">
        <p>Select file format</p>
        {/* check box wrap start */}
        <div className="check-box-wrap">
          {/* checkbox group start */}
          <div className="check-box-group">
            <input
              type="checkbox"
              className="check-input"
              id="check-pdf"
              name="check-pdf"
              checked={checkPdf}
              onChange={onPdfChange}
            />
            <label htmlFor="check-pdf" className="check-label">
              <div className="check-circle">
                <FaCheck className="icon" />
              </div>
              <span>PDF</span>
            </label>
          </div>
          {/* checkbox group end */}
          {/* checkbox group start */}
          <div className="check-box-group">
            <input
              type="checkbox"
              className="check-input"
              id="check-csv"
              name="check-csv"
              checked={checkCsv}
              onChange={onCsvChange}
            />
            <label htmlFor="check-csv" className="check-label">
              <div className="check-circle">
                <FaCheck className="icon" />
              </div>
              <span>CSV (Excel)</span>
            </label>
          </div>
          {/* checkbox group end */}
        </div>
        {/* check box wrap end */}

        {/* button-wrap start */}
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Dna width={70} height={70} />
          </div>
        ) : (
          <RevvexButton
            label="Generate Report"
            btnType="button"
            btnClassName="btn"
            bgColor={!activateButton() ? "var(--disable-color)" : ""}
            onClick={() => {
              if (activateButton() && onGenerateReport) {
                onGenerateReport();
              }
            }}
            style={{
              cursor: !activateButton() ? "not-allowed" : "",
              color: !activateButton() ? "var(--disable-mid-color)" : "",
            }}
          />
        )}
        {/* button-wrap end */}
        {/* form wrap end */}
      </div>
    </div>
  );
};
export default ReportGenerateModal;
