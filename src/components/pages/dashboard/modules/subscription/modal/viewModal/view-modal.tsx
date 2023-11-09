import "./view-modal.css";
import {
  CountryNigIcon,
  SmallArrowBack,
} from "../../../../../../../assets/icons/icons";
import { capitalizeFirstWord } from "../../../../../../helpers/helpers";

interface ViewModalProps {
  onHandleStatus?: () => void;
  onClose?: () => void;
}

const ViewModal = ({ onHandleStatus, onClose }: ViewModalProps) => {
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
  const viewItemsValue = [
    {
      organization_name: "Microsoft",
      email_address: "hlamidi@zojatech.com",
      phone_number: "09087365217",
      location: {
        // delete logo icon on integration if its coming from BE. :)
        city: "Lagos, Nigeria",
        logo: CountryNigIcon,
      },
      date_added: "June 8, 2022",
      subscription_plans: "SME",
      last_seen: "June 8, 2:30pm",
      status: "Canceled",
    },
  ];
  return (
    <div className="view-modal-wrap">
      <div className="title-wrap">
        <figure className="arrow-icon" onClick={onClose}>
          {SmallArrowBack}
        </figure>
        <p>Organisation Details</p>
      </div>
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
          {viewItemsValue.map((chi) => {
            const {
              organization_name,
              email_address,
              phone_number,
              location,
              date_added,
              subscription_plans,
              last_seen,
              status,
            } = chi;
            return (
              <div className="right-box">
                <p>{organization_name}</p>
                <p>{capitalizeFirstWord(email_address)}</p>
                <p>{phone_number}</p>

                {/* city box start */}
                <div className="city-wrap">
                  <p>{location.city}</p>
                  <figure className="logo-icon">{location.logo}</figure>
                </div>
                {/* city box end */}

                <p>{date_added}</p>
                <p>{subscription_plans}</p>
                <p>{last_seen}</p>
                <p
                  className={`view-status-text ${
                    status.toLowerCase() === "active"
                      ? "active-status-text"
                      : status.toLowerCase() === "pending"
                      ? "pending-status-text"
                      : ""
                  }`}
                >
                  {status}
                </p>
              </div>
            );
          })}
          {/* right-wrap end */}
        </div>

        {/* right-body-wrap start */}
        {/* ------->>> each of the status color have been defined in the styling  */}
        {/* ------->>> condition using their classname instead of inline styling :)  */}
        <p className="status-text" onClick={onHandleStatus}>
          {"Cancel Subscription"}
        </p>
        {/* right-body-wrap end */}
      </div>
      {/* body-wrap end */}
    </div>
  );
};
export default ViewModal;
