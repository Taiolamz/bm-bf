import { useState } from "react";
import {
  ActionIcon,
  CancelIcon,
  EyeIcon,
  ReminderIcon,
} from "../../../assets/icons/icons";

interface TableBodyProps {
  one?: string;
  two?: string;
  three?: string;
  four?: string;
  five?: string;
  six?: string;
  status?: string;
  num?: any;
  action?: boolean;
  viewText?: string;
  reminderText?: string | null;
  cancelSubText?: string | null;
  indexNo?: string;
  setIndexNo?: () => void;
  onView?: () => void;
  onReminder?: () => void;
  onCancelSub?: () => void;
  paymentIcon?: string;
  payment?: string | null;
}

const TableBody = ({
  one,
  two,
  three,
  four,
  five,
  six,
  status,
  num,
  action,
  viewText,
  reminderText,
  cancelSubText,
  setIndexNo,
  indexNo,
  onView,
  onReminder,
  onCancelSub,
  paymentIcon,
  payment,
}: TableBodyProps) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <tbody>
      {/* table body box start */}
      <tr>
        {<td>{num + 1 < 10 ? `0${num + 1}` : num + 1}</td>}
        {one && <td>{one}</td>}
        {two && <td>{two}</td>}
        {/* icon show */}
        {/* ---->>>if the table has icons */}
        {/* ---->>use this "row-icon-wrap" props */}
        {payment && (
          <td className="row-icon-wrap">
            <img src={paymentIcon} alt="table-icon" />
            <td>{payment}</td>
          </td>
        )}
        {/* icon show */}
        {three && <td>{three}</td>}
        {four && <td>{four}</td>}
        {five && <td>{five}</td>}
        {six && <td>{six}</td>}
        {/* ----->> change status value if it doesnt 
        co-relate endpoint  : )*/}
        {status && (
          <td
            className={`status ${
              status.toLowerCase() === "pending"
                ? "pending-status"
                : status.toLowerCase() === "canceled"
                ? "cancel-status"
                : status.toLowerCase() === "free trials"
                ? "free-trial-status"
                : null
            }`}
          >
            {status}
          </td>
        )}
        {action && (
          <td
            onClick={() => {
              if (setIndexNo) {
                setIndexNo();
              }
              indexNo === num
                ? setShowDropdown(!showDropdown)
                : setShowDropdown(true);
            }}
          >
            {ActionIcon}
          </td>
        )}
        {/* action dropdown wrap start */}
        {showDropdown && indexNo === num && (
          <div
            className={`drop-down-box ${
              showDropdown && indexNo === num && "drop-down-show-box"
            }`}
          >
            {viewText && (
              <p className="view-box" onClick={onView}>
                <figure>{EyeIcon}</figure>
                {viewText || "View"}
              </p>
            )}
            {reminderText && (
              <p className="view-box" onClick={onReminder}>
                <figure>{ReminderIcon}</figure>
                {reminderText}
              </p>
            )}
            {cancelSubText && (
              <p className="view-box" onClick={onCancelSub}>
                <figure>{CancelIcon}</figure>
                {cancelSubText}
              </p>
            )}
          </div>
        )}
        {/* action dropdown wrap end */}
      </tr>
      {/* table body box end */}
    </tbody>
  );
};

export default TableBody;
