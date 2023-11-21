import { useState } from "react";
import {
  ActionIcon,
  CancelIcon,
  DeleteIcon,
  EditIcon,
  EyeIcon,
  //   PenEditIcon,
  ReminderIcon,
} from "../../../assets/icons/icons";
import { FaCheck } from "react-icons/fa";
import Switch from "react-switch";
import Skeleton from "react-loading-skeleton";
import { Dna } from "react-loader-spinner";

interface TableBodyProps {
  one?: string;
  two?: string;
  three?: string;
  four?: string;
  five?: string;
  six?: string | any;
  status?: string | any;
  num?: any;
  action?: boolean;
  viewText?: string;
  reminderText?: string | null;
  cancelSubText?: string | null;
  indexNo?: string;
  setIndexNo?: () => void;
  onView?: () => void;
  onSendReminder?: () => void;
  onCancelSub?: () => void;
  paymentIcon?: string;
  payment?: string | null;
  checkBox?: boolean;
  checkId?: string;
  checkValue?: any;
  onCheck?: (e: any) => void;
  dontShowserialNo?: boolean;
  editDeleteAction?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  showOddEvenBody?: boolean;
  statusNoBg?: boolean;
  activateUserText?: string;
  userCheck?: any;
  handleUserCheck?: (userCheck?: any) => void;
  activateUserIcon?: any;
  handleUserClick?: () => void;
  customIcon?: any;
  onAction?: () => void;
  editIcon?: any;
  deactiveIcon?: any;
  loading?: boolean;
  loadingStatus?: boolean;
  loadingView?: boolean;
  onOverview?: () => void;
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
  onSendReminder,
  onCancelSub,
  paymentIcon,
  payment,
  checkBox,
  checkId,
  checkValue,
  onCheck,
  dontShowserialNo,
  editDeleteAction,
  onEdit,
  onDelete,
  showOddEvenBody,
  statusNoBg,
  activateUserText,
  userCheck,
  handleUserCheck,
  activateUserIcon,
  handleUserClick,
  customIcon,
  onAction,
  editIcon,
  deactiveIcon,
  loading,
  loadingStatus,
  loadingView,
  onOverview,
}: TableBodyProps) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <tbody className={showOddEvenBody ? "table-odd-even-body" : ""}>
      {/* table body box start */}
      <tr onClick={onOverview}>
        {checkBox && (
          <td>
            <input
              type="checkbox"
              name={`table-check-${checkId}`}
              id={`table-check-${checkId}`}
              checked={checkValue}
              className="table-check-input-row"
              value={checkValue}
              onChange={(e: any) => {
                if (onCheck) {
                  onCheck(e);
                }
              }}
            />
            <label
              className="table-check-label-input-row"
              htmlFor={`table-check-${checkId}`}
            >
              {loading ? (
                <Skeleton   />
              ) : (
                <FaCheck className="icon" />
              )}
            </label>
          </td>
        )}

        {!dontShowserialNo && (
          <td>
            {loading ? (
              <Skeleton width={30}   />
            ) : num + 1 < 10 ? (
              `0${num + 1}`
            ) : (
              num + 1
            )}
          </td>
        )}
        {one && (
          <td className={`${one?.includes("@") && "remove-capitalize"}`}>
            {loading ? <Skeleton   /> : one}
          </td>
        )}
        {two && (
          <td className={`${two?.includes("@") && "remove-capitalize"}`}>
            {loading ? <Skeleton   /> : two}
          </td>
        )}
        {/* icon show */}
        {/* ---->>>if the table has icons */}
        {/* ---->>use this "row-icon-wrap" props */}
        {payment && (
          <>
            {loading ? (
              <div style={{ marginTop: "1.5rem" }}>
                <Skeleton   />
              </div>
            ) : (
              <td className="row-icon-wrap">
                <img src={paymentIcon} alt="table-icon" />
                <td>{payment}</td>
              </td>
            )}
          </>
        )}
        {/* icon show */}
        {three && (
          <td className={`${three?.includes("@") && "remove-capitalize"}`}>
            {loading ? <Skeleton   /> : three}
          </td>
        )}
        {four && (
          <td className={`${four?.includes("@") && "remove-capitalize"}`}>
            {loading ? <Skeleton   /> : four}
          </td>
        )}
        {five && (
          <td className={`${five?.includes("@") && "remove-capitalize"}`}>
            {loading ? <Skeleton   /> : five}
          </td>
        )}
        {six && (
          <td className={`${six?.includes("@") && "remove-capitalize"}`}>
            {loading ? <Skeleton   /> : six}
          </td>
        )}
        {/* ----->> change status value if it doesnt 
        co-relate endpoint  : )*/}
        {status && (
          <>
            {loading ? (
              <div style={{ marginTop: "1rem" }}>
                <Skeleton   />
              </div>
            ) : (
              <td
                style={{ backgroundColor: statusNoBg ? "transparent" : "" }}
                className={`status ${
                  status === "pending"
                    ? "pending-status"
                    : status === "cancelled" ||
                      status === "inactive" ||
                      status === "expired"
                    ? "cancel-status"
                    : status === "free trials"
                    ? "free-trial-status"
                    : ""
                }`}
              >
                {status}
              </td>
            )}
          </>
        )}
        {action && (
          <td>
            <figure
              onClick={() => {
                if (action) {
                  if (setIndexNo) {
                    setIndexNo();
                  }
                  indexNo === num
                    ? setShowDropdown(!showDropdown)
                    : setShowDropdown(true);
                } else if (customIcon) {
                  if (onAction) {
                    onAction();
                  }
                }
              }}
              className="action-icon"
            >
              {loading ? (
                <Skeleton width={34}   />
              ) : (
                customIcon || ActionIcon
              )}
            </figure>
          </td>
        )}
        {editDeleteAction && (
          <div className="edit-delete-wrap">
            <figure onClick={onEdit}>{EditIcon}</figure>
            <figure onClick={onDelete}>{DeleteIcon}</figure>
          </div>
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
                {loadingView ? (
                  <div style={{ marginTop: "-.7rem", marginLeft: ".5rem" }}>
                    <Dna width={40} height={35} />
                  </div>
                ) : (
                  viewText || "View"
                )}
              </p>
            )}

            {reminderText && (
              <p className="view-box" onClick={onSendReminder}>
                <figure>{editIcon || ReminderIcon}</figure>
                {loadingStatus ? (
                  <div style={{ marginTop: "-.7rem", marginLeft: ".5rem" }}>
                    <Dna width={40} height={35} />
                  </div>
                ) : (
                  reminderText
                )}
              </p>
            )}
            {cancelSubText && (
              <p className="view-box" onClick={onCancelSub}>
                <figure>{deactiveIcon || CancelIcon}</figure>
                {loadingStatus ? (
                  <div style={{ marginTop: "-.7rem" }}>
                    <Dna width={40} height={35} />
                  </div>
                ) : (
                  cancelSubText
                )}
              </p>
            )}

            {activateUserText && (
              <div className="user-activate-wrap">
                <div className="user-text-wrap" onClick={handleUserClick}>
                  <figure>{activateUserIcon}</figure>
                  <label
                    htmlFor="user_activate"
                    style={{
                      color:
                        activateUserText === "Delete User" ? "#CC0905" : "",
                    }}
                  >
                    {activateUserText}
                  </label>
                </div>
                {activateUserText !== "Delete User" ? (
                  <>
                    {loadingStatus ? (
                      <Dna width={35} height={35} />
                    ) : (
                      <Switch
                        onChange={() => {
                          if (handleUserCheck) {
                            handleUserCheck();
                          }
                        }}
                        checked={userCheck}
                        id="user_activate"
                        className="user-switch"
                        offColor="#E5E9EB"
                        onColor="#004BFF"
                        handleDiameter={11}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        height={20}
                        width={40}
                        boxShadow={"none"}
                        activeBoxShadow={"none"}
                      />
                    )}
                  </>
                ) : null}
              </div>
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
