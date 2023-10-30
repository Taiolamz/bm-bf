import AuthLayout from "../layout/auth";
import CheckLockImg from "../../../../assets/check-lock-img.svg";
import { useNavigate } from "react-router-dom";
import { RevvexButton } from "../../../buttons/button";

const PasswordSuccess = () => {
  const navigate = useNavigate();
  return (
    <AuthLayout>
      {/* request-password-wrap start */}
      <div className="request-password-wrap">
        {/* image wrap start */}
        <img
          className="request-check-icon"
          src={CheckLockImg}
          alt="check_lock"
        />
        {/* image wrap end */}

        {/* label/title start */}
        <p className="request-title">Password Updated</p>
        {/* label/title end */}

        {/* text start */}
        <p>Log into your account with your new password</p>
        {/* text end */}
      </div>
      {/* request-password-wrap end */}

      {/* revvex button start */}
      <RevvexButton
        label="Proceed to Login"
        btnType="button"
        onClick={() => navigate("/login")}
      />
      {/* revvex button end */}
    </AuthLayout>
  );
};

export default PasswordSuccess;
