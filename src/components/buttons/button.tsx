import "./button.css";

interface BtnProps {
  label: string ;
  onClick?: (param?: any) => void;
  btnClassName?: string;
  bgColor?: string;
  style?: React.CSSProperties;
  btnType?: "submit" | "reset" | "button";
  btnDisable?: boolean;
}

export function RevvexButton({
  label,
  onClick,
  btnClassName,
  style,
  bgColor,
  btnType,
  btnDisable,
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
    </button>
  );
}
