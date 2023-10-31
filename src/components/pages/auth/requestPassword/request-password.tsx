import { useNavigate } from "react-router-dom";
import CheckImg from "../../../../assets/check-img.svg";
import { RevvexButton } from "../../../buttons/button";
import AuthLayout from "../layout/auth";
import "./request-password.css";
import { useState } from "react";
import ReactPinField from "react-pin-field";

const RequestPassword = () => {
  const navigate = useNavigate();

  const [showActive, setShowActive] = useState(false);
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  return (
    <AuthLayout>
      {/* request-password-wrap start */}
      <div className="request-password-wrap">
        {/* image wrap start */}
        <img className="request-check-icon" src={CheckImg} alt="check_image" />
        {/* image wrap end */}

        {/* label/title start */}  
        <p className="request-title">Request sent</p>
        {/* label/title end */}

        {/* text start */}
        <p>
          A One-Time Password (OTP) has been dispatched to your email. Please
          enter the OTP to continue.
        </p>
        {/* text end */}
      </div>
      {/* request-password-wrap end */}
      {/* otp-wrap start */}
      <div className="otp-field-wrap">
        <ReactPinField
          length={4}
          className={`pin-field ${showActive && "pin-field-complete"}`}
          onChange={(num: any) => {
            setShowActive(false);
            setError("");
            setToken(num);
          }}
          onComplete={(num) => {
            setShowActive(true);
            // handleSubmitDirect(num);
          }}
          // disabled={completed}
          validate="0123456789"
          autoFocus
          // ref={ref}
        />
      </div>
      {/* otp-wrap end */}

      {/* revvex button start */}
      <RevvexButton
        label="Proceed"
        btnType="button"
        onClick={() => navigate("/new-password")}
      />
      {/* revvex button end */}
    </AuthLayout>
  );
};
export default RequestPassword;
