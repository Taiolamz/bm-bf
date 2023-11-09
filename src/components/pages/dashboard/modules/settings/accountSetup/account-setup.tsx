import { FaAngleRight } from "react-icons/fa";
import { RevvexButton } from "../../../../../buttons/button";
import Select from "react-select";
import "./account-setup.css";

const AccountSetup = () => {
  return (
    <div className="account-setup-wrap">
      {/* first-layer wrap start */}
      <div className="account-detail-wrap">
        <div className="account-detail-box">
          <p>Profile Information</p>
          <p>Change the password for this account</p>
        </div>
        <RevvexButton btnClassName="account-detail-btn" label="Change Password" />
      </div>
      {/* first-layer wrap end */}

      {/* second layer wrap start */}
      <div className="account-detail-wrap">
        <div className="account-detail-box">
          <p>Theme</p>
          <p>Set your account display</p>
        </div>
        {/* dropdown start */}
        <Select placeholder="Select Theme" />
        {/* dropdown end */}
      </div>
      {/* second layer wrap end */}

      {/* third layer wrap start */}
      <div className="account-detail-wrap">
        <div className="account-detail-box">
          <p>Language</p>
          <p>Set your account information preference</p>
        </div>
        <Select placeholder="Select Language" />
      </div>
      {/* third layer wrap end */}

      {/* fourth layer wrap start */}
      <div className="account-detail-wrap">
        <div className="account-detail-box">
          <p>Notifications</p>
          <p>Set your account notification preference</p>
        </div>
        <FaAngleRight className="icons" />
      </div>
      {/* fourth layer wrap end */}
    </div>
  );
};

export default AccountSetup;
