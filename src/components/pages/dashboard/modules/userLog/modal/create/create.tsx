import { useState } from "react";
import { EventChange } from "../../../../../../types/types";
import "./create.css";
import { CancelIcon } from "../../../../../../../assets/icons/icons";
import { FaCheck, FaTimes } from "react-icons/fa";
import { RevvexButton } from "../../../../../../buttons/button";

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  super_admin: boolean;
  admin_settlement: boolean;
  support: boolean;
}

interface NewAdminProp {
  onClose?: () => void;
}

const NewAdmin = ({ onClose }: NewAdminProp) => {
  const [details, setDetails] = useState<FormData>({
    first_name: "",
    last_name: "",
    email: "",
    super_admin: false,
    admin_settlement: false,
    support: false,
  });

  const handleChange = (e: EventChange) => {
    const { name, value } = e.target;
    const data = { ...details, [name]: value };
    setDetails(data);
  };
  return (
    <div className="new-admin-wrap">
      {/* header start */}
      <div className="title-wrap">
        <p className="title">New Admin User</p>
        <div className="cancel-wrap" onClick={onClose}>
          {/* <figure className="cancel-icon">{CancelIcon}</figure> */}
          <FaTimes className="cancel-icon" />
        </div>
      </div>
      {/* header end */}

      {/* body wrap start */}
      <form className="form-wrap">
        {/*form-box wrap start  */}
        <div className="form-box">
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            placeholder="Hassan"
            value={details.first_name}
            onChange={handleChange}
            className={`input ${details.first_name && "input-active"}`}
          />
        </div>
        {/*form-box wrap end  */}

        {/* form box wrap start */}
        <div className="form-box">
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            placeholder="Lamidi"
            value={details.last_name}
            onChange={handleChange}
            className={`input ${details.last_name && "input-active"}`}
          />
        </div>
        {/* form box wrap end */}

        {/* form box wrap start */}
        <div className="form-box">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="hlamidi@zojatech.com"
            value={details.email}
            onChange={handleChange}
            className={`input ${details.email && "input-active"}`}
          />
        </div>
        {/* form box wrap end */}

        {/* checkbox form wrap start */}
        <div className="check-box-wrap">
          <p>Assign Role</p>
          <div className="check-box-group">
            <p className="sub-text">Click checbox to assign user role</p>
            {/* checkbox form group start*/}
            <div className="checkbox-box">
              <input
                type="checkbox"
                id="super_admin"
                name="super_admin"
                className="check-input"
                checked={details.super_admin}
                onChange={(e: any) =>
                  setDetails((prev) => {
                    return { ...prev, super_admin: e.target.checked };
                  })
                }
              />
              <label htmlFor="super_admin" className="check-label">
                <div className="check-circle">
                  <FaCheck className="icon" />
                </div>
                <div className="check-text-wrap">
                  <p className="check-text">Super Admin</p>
                  <span className="sub-check-text">
                    - can perform all functions
                  </span>
                </div>
              </label>
            </div>
            {/* checkbox form group end*/}

            {/* checkbox form group start*/}
            <div className="checkbox-box">
              <input
                type="checkbox"
                id="admin_settlement"
                name="admin_settlement"
                className="check-input"
                checked={details.admin_settlement}
                onChange={(e: any) =>
                  setDetails((prev) => {
                    return { ...prev, admin_settlement: e.target.checked };
                  })
                }
              />
              <label htmlFor="admin_settlement" className="check-label">
                <div className="check-circle">
                  <FaCheck className="icon" />
                </div>
                <div className="check-text-wrap">
                  <p className="check-text">Admin Settlements</p>
                  <span className="sub-check-text">
                    - can perform transaction functions
                  </span>
                </div>
              </label>
            </div>
            {/* checkbox form group end*/}

            {/* checkbox form group start*/}
            <div className="checkbox-box">
              <input
                type="checkbox"
                id="support"
                name="support"
                className="check-input"
                checked={details.support}
                onChange={(e: any) =>
                  setDetails((prev) => {
                    return { ...prev, support: e.target.checked };
                  })
                }
              />
              <label htmlFor="support" className="check-label">
                <div className="check-circle">
                  <FaCheck className="icon" />
                </div>
                <div className="check-text-wrap">
                  <p className="check-text">Reporter</p>
                  <span className="sub-check-text">
                    - can respond to support and make complaints
                  </span>
                </div>
              </label>
            </div>
            {/* checkbox form group end*/}
          </div>
        </div>
        {/* checkbox form wrap end */}
        <div className="btn-wrap">
          <RevvexButton label="Cancel" btnClassName="cancel-btn" />
          <RevvexButton label="Send Invite" btnClassName="invite-btn" />
        </div>
      </form>
      {/* body wrap end */}
    </div>
  );
};
export default NewAdmin;
