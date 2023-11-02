import { useState } from "react";
import AuthLayout from "../layout/auth";
import EmailIcon from "../../../../assets/email-icon.svg";
import { validateEmail } from "../../../helpers/helpers";
import { GiCheckMark } from "react-icons/gi";
import { EventChange } from "../../../types/types";
import { LiaTimesSolid } from "react-icons/lia";
import { RevvexButton } from "../../../buttons/button";
import { toast } from "react-toastify";
import RequestPassword from "../requestPassword/request-password";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [showRequestPassword, setShowRequestPassword] = useState(false);

  const handleChange = (e: EventChange) => {
    setEmail(e.target.value);
  };

  // activate button ^^
  const activeBtn = () => {
    let btnActive = false;
    if (email) {
      btnActive = true;
    }
    return btnActive;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    //  validations start ----------------
    if (!validateEmail(email)) {
      toast.error("Invalid email address!", {
        theme: "colored",
        position: "top-right",
      });
      return;
    }
    // validations end -----------------

    if (activeBtn()) {
      setShowRequestPassword(true);
 
    }
  };
  return (
    <>
      {showRequestPassword ? (
        <RequestPassword />
      ) : (
        <AuthLayout
          Title="Reset Password"
          text="Input email to receive a system generated password"
          onSubmit={handleSubmit}
        >
          {/* form group start */}
          <div className="auth-form-group">
            <label htmlFor="password">
              <img
                src={EmailIcon}
                className="auth-left-icon"
                alt="email_icon"
              />
            </label>
            <input
              className={`auth-input ${email && "auth-input-active"}`}
              type="text"
              placeholder="Email"
              name="email"
              id="email"
              value={email}
              onChange={handleChange}
            />

            {/* email check icon start */}

            {validateEmail(email) ? (
              <GiCheckMark
                color="var(--green-color)"
                className="auth-check-icon"
              />
            ) : (
              <LiaTimesSolid
                color={email ? "var(--red-color)" : ""}
                className="auth-check-icon"
              />
            )}

            {/* email check icon end */}

            <label
              htmlFor="email"
              className={`auth-label ${email && "auth-label-active"}`}
            >
              Email
            </label>
          </div>
          {/* form group end */}

          {/* revvex button wrap start */}
          <RevvexButton
            label={"Request new password"}
            btnClassName="auth-btn"
            bgColor={activeBtn() ? "var(--light-blue)" : "var(--disable-color)"}
            style={{
              color: activeBtn()
                ? "var(--white-color)"
                : "var(--disable-mid-color)",
              cursor: activeBtn() ? "pointer" : "not-allowed",
            }}
            btnType="submit"
            onClick={() => activeBtn() && handleSubmit}
            btnDisable={!activeBtn()}
          />
          {/* revvex button wrap stop */}
        </AuthLayout>
      )}
    </>
  );
};
export default ForgotPassword;
