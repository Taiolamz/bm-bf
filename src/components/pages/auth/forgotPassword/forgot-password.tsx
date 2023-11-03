import { useState } from "react";
import AuthLayout from "../layout/auth";
import EmailIcon from "../../../../assets/email-icon.svg";
import { encryptTokenFunc, validateEmail } from "../../../helpers/helpers";
import { GiCheckMark } from "react-icons/gi";
import { EventChange } from "../../../types/types";
import { LiaTimesSolid } from "react-icons/lia";
import { RevvexButton } from "../../../buttons/button";
import { toast } from "react-toastify";
import RequestPassword from "../requestPassword/request-password";
import { Dna } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import RootState from "../../../../redux/types";
import { requestOtpForgetPassword } from "../../../../redux/userAuth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { loading } = useSelector((state: RootState) => state.auth);
  const [showRequestPassword, setShowRequestPassword] = useState(false);
  const dispatch = useDispatch()
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

  const handleSubmit = async(e: any) => {
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
      const obj = {
        email: email
      }
      const data = await dispatch(requestOtpForgetPassword(obj) as any);
      if(data?.payload?.data?.success){
        localStorage.setItem("bayuoa", encryptTokenFunc(email))
        setShowRequestPassword(true)
      }
    }
  };
  return (
    <>
      {showRequestPassword ? (
        <RequestPassword email={email} />
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
              label={"Request new password"}
              btnClassName="auth-btn"
              bgColor={
                activeBtn() ? "var(--blue-color)" : "var(--disable-color)"
              }
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
          )}
          {/* revvex button wrap stop */}
        </AuthLayout>
      )}
    </>
  );
};
export default ForgotPassword;
