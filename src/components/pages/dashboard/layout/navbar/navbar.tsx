import "./navbar.css";
import {
  GoBackIcon,
  NavSettingsIcon,
  NofiticationIcon,
} from "../../../../../assets/icons/icons";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface NavbarProps {
  pageTitle?: string;
  goBack?: boolean;
}

interface CurrencyOption {
  label: string;
  value: string;
}

const Navbar = ({ pageTitle, goBack }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [time, setTime] = useState(new Date());
  const [currency, setCurrency] = useState("");
  const currencyOption: CurrencyOption[] = [
    { label: "NGN", value: "NGN" },
    { label: "EUR", value: "EUR" },
    { label: "USD", value: "USD" },
  ];

  const handleSelectCurrency = (currency: string) => {
    setCurrency(currency);
    if (currency) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    const timeId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timeId);
    };
  }, []);

  //   time layout
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  return (
    <div className="navbar-wrap">
      {/* left-wrap start */}
      <div className="left-wrap">
        {/* goback start */}
        {goBack && (
          <div className="go-back-box" onClick={() => navigate(-1)}>
            <figure className="img">{GoBackIcon}</figure>
          </div>
        )}
        {/* goback end */}

        <p
          className={`page-title ${
            location.pathname === "/dashboard-home" && "name-title"
          } `}
        >
          {pageTitle}
        </p>
      </div>
      {/* left-wrap end */}

      <div className="right-wrap">
        {/* dropdown start */}
        <div
          className="currency-wrap"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <p className="currency-text">{currency || "Currency"}</p>

          <IoIosArrowDown
            color="var(--black-color)"
            className={`arrow-icon ${showDropdown && "arrow-icon-anime"}`}
          />
        </div>
        {showDropdown && (
          <span
            className={`drop-down-box ${showDropdown && "drop-down-show-box"}`}
          >
            {currencyOption.map((chi, idx) => {
              const { label, value } = chi;
              return (
                <p
                  className={`${
                    currency === label ? "active-currency-val" : ""
                  }`}
                  onClick={() => handleSelectCurrency(value)}
                  key={idx}
                >
                  {label}
                </p>
              );
            })}
          </span>
        )}
        {/* dropdown end */}

        {/* notification-icon start */}
        <figure className="notification-icon">
          {NofiticationIcon}
          <span></span>
        </figure>
        {/* notification-icon end */}

        {/* settings wrap start */}
        <figure className="settings-icon">{NavSettingsIcon}</figure>
        {/* settings wrap end */}

        {/* timing settings start */}
        <div className="time-wrap">
          <span>{hours < 10 ? `0${hours}` : hours}</span>
          <span>:</span>
          <span>{minutes < 10 ? `0${minutes}` : minutes}</span>
          <span>:</span>
          <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
        </div>
        {/* timing settings end */}
      </div>
    </div>
  );
};
export default Navbar;
