import "./view-modal.css";
import {
  CountryNigIcon,
  SmallArrowBack,
} from "../../../../../../../assets/icons/icons";
// import { capitalizeFirstWord } from "../../../../../../helpers/helpers";
import moment from "moment";
import { Dna } from "react-loader-spinner";

interface ViewModalProps {
  onHandleStatus?: () => void;
  onClose?: () => void;
  detail?: any;
  showCancelSub?: boolean;
  className?: string;
  showOrgDetailsText?: boolean;
  loading?: boolean;
}

const ViewModal = ({
  onHandleStatus,
  onClose,
  detail,
  showCancelSub,
  className,
  showOrgDetailsText,
  loading,
}: ViewModalProps) => {
  const viewItemsLabel = [
    "Organisation Name",
    "Email Address",
    "Phone Number",
    "Country / Location",
    "Date Added",
    "Subscription Plans",
    "Last Seen",
    "Status",
  ];
  return (
    <div className={`view-modal-wrap ${className}`}>
      {showOrgDetailsText && (
        <div className="title-wrap">
          <figure className="arrow-icon" onClick={onClose}>
            {SmallArrowBack}
          </figure>
          <p onClick={() => console.log(detail)}>Organisation Details</p>
        </div>
      )}
      {/* body-wrap start */}
      <div className="view-modal-body-wrap">
        <div className="left-modal-body-wrap">
          {/* left-wrap start */}
          <div className="left-box">
            {viewItemsLabel.map((chi) => (
              <p>{chi}</p>
            ))}
          </div>
          {/* left-wrap end */}

          {/*demark....  */}
          <hr className="view-hr-line" />

          {/* right-wrap start */}
          {detail && Array(detail)?.map((chi) => {
            const { plan_details } = chi;
            return (
              <div className="right-box">
                <p>{plan_details?.organization.name || "_ _"}</p>
                <p className="email">{plan_details?.user.email}</p>
                <p>{plan_details?.user.phone_number || "_ _"}</p>
                {/* <p>{phone_number}</p> */}

                {/* city box start */}
                <div className="city-wrap">
                  <p>{plan_details?.organization.country || "_ _"}</p>
                  {/* <p>{location.city}</p> */}
                  <figure className="logo-icon">{"_ _"}</figure>
                  {/* <figure className="logo-icon">{location.logo}</figure> */}
                </div>
                {/* city box end */}

                <p>
                  {plan_details?.organization.date_added
                    ? moment(plan_details?.organization.date_addedd).format(
                        "YYYY - MM - DD"
                      )
                    : "_ _"}
                </p>
                <p>{plan_details?.subscription_plan_details.title || "_ _"}</p>
                {/* ^^ last seen ^^ */}
                <p>
                  {plan_details?.updated_at
                    ? moment(plan_details?.updated_at).format("YYYY - MM - DD")
                    : "_ _"}
                </p>
                {/* <p>{last_seen}</p> */}
                <p
                  className={`view-status-text ${
                    plan_details?.status === "active" ||
                    plan_details?.status === "trial"
                      ? "active-status-text"
                      : ""//   : plan_details.status.toLowerCase() === "cancelled" ||
                    //   plan_details.status === "pending"
                    //   ? "pending-status-text"
                    //   : ""
                  }`}
                >
                  {plan_details?.status}
                </p>
              </div>
            );
          })}
          {/* right-wrap end */}
        </div>

        {/* right-body-wrap start */}
        {/* ------->>> each of the status color have been defined in the styling  */}
        {/* ------->>> conition using their classname instead of inline styling :)  */}
        {showCancelSub && (
          <>
            {loading ? (
              <div
                className="status-text"
                style={{ border: "none", marginTop: "-3rem" }}
              >
                <Dna width={60} height={100} />
              </div>
            ) : (
              <p
                className={`status-text ${
                  detail?.plan_details?.status === "cancelled"
                    ? "active-status"
                    : detail?.plan_details?.status === "pending"
                    ? "no-status"
                    : ""
                }`}
                onClick={onHandleStatus}
              >
                {detail?.plan_details?.status === "active" ||
                detail?.plan_details?.status === "trial"
                  ? "Cancel Subscription"
                  : detail?.plan_details?.status === "cancelled"
                  ? "Activate Subscription"
                  : ""}
              </p>
            )}
          </>
        )}
        {/* right-body-wrap end */}
      </div>
      {/* body-wrap end */}
    </div>
  );
};
export default ViewModal;
