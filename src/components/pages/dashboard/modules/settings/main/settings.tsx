import { useState } from "react";
import Tabs from "../../../../../tab/tab";
import DashboardLayout from "../../../layout/dashboardLayout/dashboard-layout";
import "./settings.css";
import Profile from "../profile/profile";
import AccountSetup from "../accountSetup/account-setup";

const Settings = () => {
  const tabItems = ["profile", "account setup"];
  const [selectedTab, setSelectedTab] = useState<any>("profile");
  const handleSelectedTab = (tab: string) => {
    setSelectedTab(tab);
  };
  return (
    <DashboardLayout pageTitle="Settings" goBack>
      <div className="settings-wrap">
        <Tabs
          tabItems={tabItems}
          onTabSelect={handleSelectedTab}
          activeTab={selectedTab}
          className="settings-active-tab"
        />
      </div>

      {selectedTab === "account setup" ? <AccountSetup /> : <Profile />}
    </DashboardLayout>
  );
};
export default Settings;
