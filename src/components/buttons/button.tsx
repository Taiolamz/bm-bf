import "./button.css";
import { PlusIcon } from "../../assets/icons/icons";
import { ReactNode } from "react";
interface BtnProps {
  label: string | any;
  onClick?: (param?: any) => void;
  btnClassName?: string;
  bgColor?: string;
  style?: React.CSSProperties;
  btnType?: "submit" | "reset" | "button";
  btnDisable?: boolean;
  plusIcon?: boolean;
  icon?: any;
  plusIconColor?: any;
  children?: ReactNode;
}

export function RevvexButton({
  label,
  onClick,
  btnClassName,
  style,
  bgColor,
  btnType,
  btnDisable,
  plusIcon,
  icon,
  plusIconColor,
  children,
}: BtnProps) {
  return (
    <button
      disabled={btnDisable}
      type={btnType}
      className={`revvex-btn-wrap ${btnClassName}`}
      style={{ backgroundColor: bgColor ? bgColor : "", ...style }}
      onClick={onClick}
    >
      {label}
      {children}
      {(icon || plusIcon) && (
        <figure className={icon && "icon"}>
          {icon || <PlusIcon plusIconColor={plusIconColor} />}
        </figure>
      )}
    </button>
  );
}
