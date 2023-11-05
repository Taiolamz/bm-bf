import { MouseEvent, useEffect, useRef, useState } from "react";
import "./report-generate-modal.css";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";
import moment from "moment";
import { CalenderIcon } from "../../../../../../../assets/icons/icons";
import { RevvexButton } from "../../../../../../buttons/button";
import { FaCheck } from "react-icons/fa";
import useClickOutside from "../../../../../../helpers/click-event";

interface DateType {
  start_date: string;
  end_date: string;
  check_pdf: boolean;
  check_csv: boolean;
}

const ReportGenerateModal = () => {
  const [details, setDetails] = useState<DateType>({
    start_date: "",
    end_date: "",
    check_pdf: false,
    check_csv: false,
  });

  return (
    <div className="report-generate-modal-wrap">
      {/* top-wrap start */}
      <div className="top-wrap">
        <p className="title">Generate Report</p>
        <p>Select the start date and end date for your report</p>
      </div>
      {/* top-wrap end */}

      {/* form wrap start */}
      {/* form-group start */}
      <div className="form-group">
        <label htmlFor="start_date">From</label>
        <Flatpickr
          id="start_date"
          name="start_date"
          className={`date-input ${details.start_date && "date-input-active"}`}
          autoComplete="off"
          value={details.start_date}
          onChange={(date) =>
            setDetails((prev: any) => {
              return {
                ...prev,
                start_date: moment(date[0]).format("YYYY-MM-DD"),
              };
            })
          }
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
          className={`date-input ${details.end_date && "date-input-active"}`}
          autoComplete="off"
          value={details.end_date}
          onChange={(date) =>
            setDetails((prev: any) => {
              return {
                ...prev,
                end_date: moment(date[0]).format("YYYY-MM-DD"),
              };
            })
          }
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
              checked={details.check_pdf}
              onChange={(e) =>
                setDetails((prev) => {
                  return { ...prev, check_pdf: e.target.checked };
                })
              }
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
              checked={details.check_csv}
              onChange={(e) =>
                setDetails((prev) => {
                  return { ...prev, check_csv: e.target.checked };
                })
              }
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
        <RevvexButton
          label="Generate Report"
          btnType="button"
          btnClassName="btn"
        />
        {/* button-wrap end */}
        {/* form wrap end */}
      </div>
    </div>
  );
};
export default ReportGenerateModal;
