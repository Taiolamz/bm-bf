import { ReactNode } from "react";
import "./trends.css"

interface TrendsProps {
  label: string;
  amount: string;
  children?: ReactNode;
}

const TrendsCard = ({ label, amount, children }: TrendsProps) => {
  return (
    <div className="trends-body-wrap">
      <div className="card-wrap">
        <p className="label">{label || "Profit"}</p>
        <p className="amount">{amount || "N955,000"}</p>

        {/* children area start */}
        {children}
        {/* children area end */}
      </div>
    </div>
  );
};
export default TrendsCard;


