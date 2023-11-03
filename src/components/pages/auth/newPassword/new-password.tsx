import { useState } from "react";
import AuthLayout from "../layout/auth";
import LockOpenIcon from "../../../../assets/lock-open-icon.svg";
import { EventChange } from "../../../types/types";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  decryptTokenFunc,
  validatePasswordLowercase,
  validatePasswordNumber,
  validatePasswordSpecialCharacter,
  validatePasswordUpperCase,
} from "../../../helpers/helpers";
import { toast } from "react-toastify";
import { RevvexButton } from "../../../buttons/button";
import PasswordSuccess from "../passwordSuccess/password-success";
import RootState from "../../../../redux/types";
import { useDispatch, useSelector } from "react-redux";
import { Dna } from "react-loader-spinner";
import { changePassword } from "../../../../redux/userAuth";
// import { useNavigate } from "react-router-dom";

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordSuccess, setShowPasswordSuccess] = useState(false);
  const { loading } = useSelector((state: RootState) => state.auth);
//  const navigate = useNavigate()
  const dispatch = useDispatch();

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

  const handleSubmit = async(e?: any) => {
    // e.preventDefault();
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
    if (newConfirmPassword !== newPassword) {
      toast.error("Password does not match.", {
        theme: "colored",
        position: "top-right",
      });
      return;
    }
    // validations end -----------------

    if (activeBtn()) {
      // setShowPasswordSuccess(true);
      const emailTouse = localStorage.getItem("bayuoa") ? decryptTokenFunc(localStorage.getItem("bayuoa")) : "";
      const obj = {
        email: emailTouse,
        password: newPassword,
        confirm_password: newConfirmPassword,
      };
      const data = await dispatch(changePassword(obj) as any);
      if(data?.payload?.data?.success){
        
        setShowPasswordSuccess(true)
      }
      
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
              className={`auth-input ${
                newConfirmPassword && "auth-input-active"
              }`}
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              name="password"
              id="password"
              value={newConfirmPassword}
              onChange={(e) => {
                setNewConfirmPassword(e.target.value);
              }}
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
              className={`auth-label ${newConfirmPassword && "auth-label-active"}`}
            >
              Confirm Password
            </label>
          </div>

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
      ) :  <RevvexButton
            label={"Confirm"}
            btnClassName="auth-btn"
            bgColor={newPassword && newConfirmPassword ? "var(--blue-color)" : "var(--disable-color)"}
            style={{
              color: activeBtn()
                ? "var(--white-color)"
                : "var(--disable-mid-color)",
              cursor: activeBtn() ? "pointer" : "not-allowed",
            }}
            btnType="submit"
            onClick={(e) => {
              e.preventDefault();
              if(newPassword && newConfirmPassword){
                handleSubmit(e)
              }
            }}
            // btnDisable={!activeBtn()}
          />}
          {/* revvex button wrap stop */}
          {/* form group end */}
        </AuthLayout>
      )}
    </>
  );
};
export default NewPassword;
