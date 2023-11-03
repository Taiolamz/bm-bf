import { useState } from "react";
import AuthLayout from "../layout/auth";
import EmailIcon from "../../../../assets/email-icon.svg";
import LockOpenIcon from "../../../../assets/lock-open-icon.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { LiaTimesSolid } from "react-icons/lia";
import { GiCheckMark } from "react-icons/gi";
import { Dna } from "react-loader-spinner";
import {
  encryptTokenFunc,
  validateEmail,
  validatePasswordLowercase,
  validatePasswordNumber,
  validatePasswordSpecialCharacter,
  validatePasswordUpperCase,
} from "../../../helpers/helpers";
import { toast } from "react-toastify";
import { RevvexButton } from "../../../buttons/button";
import { LoadingState } from "../../loadingPage/loading";
import { EventChange } from "../../../types/types";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import RootState from "../../../../redux/types";
import { loginUser } from "../../../../redux/userAuth";

interface LoginDetails {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [details, setDetails] = useState<LoginDetails>({
    email: "",
    password: "",
  });

  const handleChange = (e: EventChange) => {
    const { name, value } = e.target;
    const data = { ...details, [name]: value };
    setDetails(data);
  };

  // activate button ^^
  const activeBtn = () => {
    let btnActive = false;
    if (details.email && details.password) {
      btnActive = true;
    }
    return btnActive;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    //  validations start ----------------
    if (!validateEmail(details?.email)) {
      toast.error("Invalid email address!", {
        theme: "colored",
        position: "top-right",
      });
      return;
    }
    if (
      !validatePasswordLowercase(details.password) &&
      !validatePasswordUpperCase(details.password) &&
      !validatePasswordSpecialCharacter(details.password) &&
      !validatePasswordNumber(details.password)
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
    if (!validatePasswordLowercase(details.password)) {
      toast.error("Password should have at least 1 lowercase letter", {
        theme: "colored",
        position: "top-right",
      });
      return;
    }
    if (!validatePasswordUpperCase(details.password)) {
      toast.error("Password should have at least 1 capital letter", {
        theme: "colored",
        position: "top-right",
      });
      return;
    }
    if (!validatePasswordSpecialCharacter(details.password)) {
      toast.error("Password should have at least 1 special character", {
        theme: "colored",
        position: "top-right",
      });
      return;
    }
    if (!validatePasswordNumber(details.password)) {
      toast.error("Password should have at least  1 numeric character.", {
        theme: "colored",
        position: "top-right",
      });
      return;
    }
    // validations end -----------------

    // remove on integration
    if (activeBtn()) {
      // setLoader(true);
      // setTimeout(() => {
      //   setLoader(false);
      //   navigate("/dashboard-home");
      // }, 2000);
      const data = await dispatch(loginUser(details) as any);
      console.log(data);
      if (data?.payload?.response?.status === 422) {
        // console.log(data?.payload?.response?.data.message);
        const msgEmail = data?.payload?.response?.data.message;
        if (msgEmail === "The selected email is invalid.") {
          // console.log("kjgf");
          setEmailError(true);
        }
      }
      if(data?.payload?.data?.success){
        const token = data?.payload?.data?.data?.token
        localStorage.setItem("token", encryptTokenFunc(token))
        
      }
    }
  };

  return (
    <>
      {!loader ? (
        <AuthLayout Title="Login to your account" onSubmit={handleSubmit}>
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
              className={`auth-input ${details.email && "auth-input-active"} ${emailError && "auth-input-error"}`}
              type="text"
              placeholder="Email"
              name="email"
              id="email"
              value={details.email}
              onChange={handleChange}
              // style=
            />

            {/* email check icon start */}

            {validateEmail(details.email) ? (
              <GiCheckMark
                color="var(--green-color)"
                className="auth-check-icon"
              />
            ) : (
              <LiaTimesSolid
                color={details.email ? "var(--red-color)" : ""}
                className="auth-check-icon"
              />
            )}

            {/* email check icon end */}

            <label
              htmlFor="email"
              className={`auth-label ${details.email && "auth-label-active"}`}
            >
              Email
            </label>
          </div>
          {/* form group end */}

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
                details.password && "auth-input-active"
              }`}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              id="password"
              value={details.password}
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
              className={`auth-label ${
                details.password && "auth-label-active"
              }`}
            >
              Password
            </label>
            <p
              className="password-forget-text"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password
            </p>
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
              label={"Login"}
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
      ) : (
        <LoadingState />
      )}
    </>
  );
};
export default Login;
