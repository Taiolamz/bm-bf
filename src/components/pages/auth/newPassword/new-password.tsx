import { useState } from "react";
import AuthLayout from "../layout/auth";
import LockOpenIcon from "../../../../assets/lock-open-icon.svg";
import { EventChange } from "../../../types/types";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  validatePasswordLowercase,
  validatePasswordNumber,
  validatePasswordSpecialCharacter,
  validatePasswordUpperCase,
} from "../../../helpers/helpers";
import { toast } from "react-toastify";
import { RevvexButton } from "../../../buttons/button";
import PasswordSuccess from "../passwordSuccess/password-success";

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordSuccess, setShowPasswordSuccess] = useState(false);

  const handleChange = (e: EventChange) => {
    setNewPassword(e.target.value);
  };

  // activate button ^^
  const activeBtn = () => {
    let btnActive = false;
    if (newPassword) {
      btnActive = true;
    }
    return btnActive;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    //  validations start ----------------

    if (
      !validatePasswordLowercase(newPassword) &&
      !validatePasswordUpperCase(newPassword) &&
      !validatePasswordSpecialCharacter(newPassword) &&
      !validatePasswordNumber(newPassword)
    ) {
      toast.error(
        "Password should at least be 8 characters long,contain 1 capital letter, 1 lowercase letter,  1 special character,  1 numeric character.",
        {
          theme: "colored",
          position: "top-right",
        }
      );
      return;
    }
    if (!validatePasswordLowercase(newPassword)) {
      toast.error("Password should have at least 1 lowercase letter", {
        theme: "colored",
        position: "top-right",
      });
      return;
    }
    if (!validatePasswordUpperCase(newPassword)) {
      toast.error("Password should have at least 1 capital letter", {
        theme: "colored",
        position: "top-right",
      });
      return;
    }
    if (!validatePasswordSpecialCharacter(newPassword)) {
      toast.error("Password should have at least 1 special character", {
        theme: "colored",
        position: "top-right",
      });
      return;
    }
    if (!validatePasswordNumber(newPassword)) {
      toast.error("Password should have at least  1 numeric character.", {
        theme: "colored",
        position: "top-right",
      });
      return;
    }
    // validations end -----------------

    if (activeBtn()) {
      setShowPasswordSuccess(true);
    }
  };

  return (
    <>
      {showPasswordSuccess ? (
        <PasswordSuccess />
      ) : (
        <AuthLayout
          onSubmit={handleSubmit}
          Title="Input new password"
          text="Input new password and save"
        >
          {/* form group start */}
          <div className="auth-form-group">
            <label htmlFor="password">
              <img
                src={LockOpenIcon}
                className="auth-left-icon"
                alt="lock_open_icon"
              />
            </label>
            <input
              className={`auth-input ${newPassword && "auth-input-active"}`}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              id="password"
              value={newPassword}
              onChange={handleChange}
            />

            {/* password show/hide icon start */}
            <div onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <FaEye className="auth-right-icon" />
              ) : (
                <FaEyeSlash className="auth-right-icon" />
              )}
            </div>
            {/* password show/hide icon end */}

            <label
              htmlFor="password"
              className={`auth-label ${newPassword && "auth-label-active"}`}
            >
              Password
            </label>
          </div>

          {/* revvex button wrap start */}
          <RevvexButton
            label={"Confirm"}
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
          {/* form group end */}
        </AuthLayout>
      )}
    </>
  );
};
export default NewPassword;
