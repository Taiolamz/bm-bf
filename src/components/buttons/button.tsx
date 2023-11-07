
import "./button.css";
// import { PlusIcon } from "../../assets/icons/icons";
interface BtnProps {
  label: string;
  onClick?: (param?: any) => void;
  btnClassName?: string;
  bgColor?: string;
  style?: React.CSSProperties;
  btnType?: "submit" | "reset" | "button";  
  btnDisable?: boolean;
  plusIcon?: boolean;
  icon?: any;  
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
      {(icon || plusIcon) && (
        <figure className={icon && 'icon' }>{icon }</figure>
      )}
    </button>
  );
}
