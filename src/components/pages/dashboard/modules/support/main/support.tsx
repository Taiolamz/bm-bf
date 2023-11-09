import { useState } from "react";
import Tabs from "../../../../../tab/tab";
import DashboardLayout from "../../../layout/dashboardLayout/dashboard-layout";
import Complaints from "../complaints/complaints";
import Chats from "../chats/chats";

const Support = () => {
  const tabList = ["complaints", "chats", "knowledge bank"];
  const [selectedTab, setSelectedTab] = useState("complaints");
  const handleSelectedTab = (tab: string) => {
    setSelectedTab(tab);
  };
  return (
    <DashboardLayout pageTitle="Support" goBack>
      <Tabs
        tabItems={tabList}
        activeTab={selectedTab}
        onTabSelect={handleSelectedTab}
      />
      {selectedTab === "chats" ? (
        <Chats />
      ) : selectedTab == "knowledge bank" ? (
        <></>
      ) : (
        <Complaints />
      )}
    </DashboardLayout>
  );
};
export default Support;
