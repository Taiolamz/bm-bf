import { useNavigate } from "react-router-dom";
import CheckImg from "../../../../assets/check-img.svg";
import { RevvexButton } from "../../../buttons/button";
import AuthLayout from "../layout/auth";
import "./request-password.css";

const RequestPassword = () => {
  const navigate = useNavigate();

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
          You will receive a system generated password soon, proceed to confirm
          your new password
        </p>
        {/* text end */}
      </div>
      {/* request-password-wrap end */}

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
