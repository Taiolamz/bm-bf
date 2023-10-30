import "./tab.css";

interface TabProps {
  tabItems: any[];
  onTabSelect: (tab: string) => void;
  activeTab: string;
}
const Tabs = ({ tabItems, onTabSelect, activeTab }: TabProps) => {
  return (
    <div className="tab-wrap">
      <div className="tab-box">
        {tabItems.map((chi, idx) => (
          <p
            key={idx}
            onClick={() => onTabSelect(chi)}
            className={`tab-items ${activeTab === chi && "active-tab"}`}
          >
            {chi}
          </p>
        ))}
      </div>
      <span className="horizontal-line"></span>
    </div>
  );
};
export default Tabs;
