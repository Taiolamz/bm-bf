import { ReactNode } from "react";
import "./tab.css";

interface TabProps {
  tabItems: any[];
  onTabSelect: (tab: string) => void;
  activeTab: string;
  className?: string;
  children?: ReactNode;
}
const Tabs = ({
  tabItems,
  onTabSelect,
  activeTab,
  className,
  children,
}: TabProps) => {
  return (
    <div className={`tab-wrap ${className}`}>
      <div className="tab-box">
        <div className="left-box">
          {tabItems.map((chi, idx) => (
            <p
              key={idx}
              onClick={() => onTabSelect(chi)}
              className={`tab-items ${
                activeTab === chi && activeTab === "active users"
                  ? "active-check-tab"
                  : activeTab === chi && activeTab === "inactive users"
                  ? "inactive-tab"
                  : activeTab === chi && "active-tab"
              }`}
            >
              {chi}
            </p>
          ))}
        </div>
        <div className="right-box">{children}</div>
      </div>
      <span className="horizontal-line"></span>
    </div>
  );
};
export default Tabs;
