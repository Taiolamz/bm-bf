import { ReactNode } from "react";
import "./auth.css";
import RevvexLogo from "../../../../assets/revvex-logo.svg";
import { Dictionary } from "../../../types/types";

interface AuthProps {
  Title?: string;
  children?: ReactNode;
  text?: string;
  onSubmit?: (item: Dictionary) => any;
  authClassName?: string;
}

const AuthLayout = ({
  Title,
  children,
  onSubmit,
  text,
  authClassName,
}: AuthProps) => {
  return (
    <div className="auth-wrap">
      {/* form wrap start */}

      <div className="auth-form-wrap">
        {/* revvex-logo start */}
        <img src={RevvexLogo} alt="revvex_logo" />
        {/* revvex-logo end */}
        <form
          action=""
          onSubmit={onSubmit}
          className={`auth-form-box ${authClassName}`}
        >
          <div className="auth-top-text-wrap">
            <p className="auth-title">{Title}</p>
            {text && <span>{text}</span>}
          </div>
          {children}
        </form>
      </div>

      {/* form wrap end */}
    </div>
  );
};
export default AuthLayout;
