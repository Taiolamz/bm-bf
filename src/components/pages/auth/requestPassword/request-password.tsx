import { useNavigate } from "react-router-dom";
import CheckImg from "../../../../assets/check-img.svg";
import { RevvexButton } from "../../../buttons/button";
import AuthLayout from "../layout/auth";
import "./request-password.css";
import { useState } from "react";
import ReactPinField from "react-pin-field";
import { useDispatch, useSelector } from "react-redux";
import RootState from "../../../../redux/types";
import { submitOtpForgetPassword } from "../../../../redux/userAuth";
import { Dna } from "react-loader-spinner";

interface myComponentPrps {
  email?: string;
}

const RequestPassword: React.FC<myComponentPrps> = ({ email }) => {
  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state.auth);
  // const [showRequestPassword, setShowRequestPassword] = useState(false);
  const dispatch = useDispatch();

  const [showActive, setShowActive] = useState(false);
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const obj = {
      otp: token,
    };
    // console.log(obj);
    // return
    const data = await dispatch(submitOtpForgetPassword(obj) as any);
    if (data?.payload?.data?.success) {
      navigate("/new-password");
    }
  };

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
          A One-Time Password (OTP) has been dispatched to your email (
          <span style={{ fontWeight: "700", color: "black" }}> {email} </span> )
          . Please enter the OTP to continue.
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
          validate="0123456789"
          autoFocus
          // ref={ref}
        />
      </div>
      {/* otp-wrap end */}

      {/* revvex button start */}
      {loading ? (
        <div style={{ alignSelf: "center" }}>
          <Dna
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            // wrapperStyle={{color: "red", backgroundColor : "red"}}
            wrapperClass="dna-wrapper"
          />
        </div>
      ) : (
        <RevvexButton
          label="Proceed"
          btnType="button"
          btnDisable={!showActive}
          bgColor={!showActive && ("#cccccc" as any)}
          onClick={() => {
            showActive && handleSubmit();
            // navigate("/new-password");
          }}
        />
      )}
      {/* revvex button end */}
    </AuthLayout>
  );
};
export default RequestPassword;
