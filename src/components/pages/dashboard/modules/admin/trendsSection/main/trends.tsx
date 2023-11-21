import { ReactNode } from "react";
import "./trends.css";
import Skeleton from "react-loading-skeleton";

interface TrendsProps {
  label: string;
  amount: string;
  children?: ReactNode;
  loading?: boolean;
  className?: string;
}

const TrendsCard = ({
  label,
  loading,
  amount,
  children,
  className,
}: TrendsProps) => {
  return (
    <div className={`trends-body-wrap  ${className}`}>
      <div className="card-wrap">
        <p className="label">{label || "Profit"}</p>
        <p className="amount">
          {loading ? <Skeleton width={200} /> : amount || "N955,000"}
        </p>

        {/* children area start */}
        {children}
        {/* children area end */}
      </div>
    </div>
  );
};
export default TrendsCard;
