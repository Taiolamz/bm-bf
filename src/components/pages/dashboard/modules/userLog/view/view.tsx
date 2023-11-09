import { useNavigate } from "react-router-dom";
import {
  SmallArrowBack,
  TrashIcon,
} from "../../../../../../assets/icons/icons";
import DashboardLayout from "../../../layout/dashboardLayout/dashboard-layout";
import "./view.css";
import Search from "../../../../../table/tableContainer/search/search";
import TableContainer from "../../../../../table/tableContainer/main/table-container";
import TableBody from "../../../../../table/tableBody/table-body";
import { capitalizeFirstWord } from "../../../../../helpers/helpers";

const ViewUserLog = () => {
  const navigate = useNavigate();
  const viewItemsLabel = [
    "Name",
    "Email Address",
    "Phone Number",
    "Date Added",
    "Last Seen",
    "Status",
  ];

  const viewItemsValue = [
    {
      name: "Hassan Lamidi",
      email_address: "hlamidi@zojatech.com",
      phone_number: "09087365217",
      date_added: "June 8, 2022",
      last_seen: "June 8, 2:30pm",
      status: "Active",
    },
  ];

  const tableHeadList = [
    "Date",
    "Activity Name",
    "Device",
    "Time",
    "IP Address",
    "Action",
  ];

  const tableBodyList = [
    {
      date: "02/08/2023",
      activity_name: "Subscription Approval",
      device: "Macbook Pro",
      time: "2:30",
      ip_address: "100.33.456.22",
    },
    {
      date: "02/08/2023",
      activity_name: "Password Update",
      device: "Macbook Pro",
      time: "2:30",
      ip_address: "100.33.456.22",
    },
    {
      date: "02/08/2023",
      activity_name: "Subscription Approval",
      device: "Macbook Pro",
      time: "2:30",
      ip_address: "100.33.456.22",
    },
    {
      date: "02/08/2023",
      activity_name: "Password Update",
      device: "Macbook Pro",
      time: "2:30",
      ip_address: "100.33.456.22",
    },
    {
      date: "02/08/2023",
      activity_name: "Subscription Approval",
      device: "Macbook Pro",
      time: "2:30",
      ip_address: "100.33.456.22",
    },
  ];

  return (
    <DashboardLayout pageTitle="User Log Management" goBack>
      {/* styling imported from view modal  */}
      <div className="view-user-log-container">
        <div className="view-modal-wrap view-user-log-wrap">
          <div className="title-wrap">
            <figure className="arrow-icon" onClick={() => navigate(-1)}>
              {SmallArrowBack}
            </figure>
            <p className="title">Profile Details</p>
          </div>
          {/* body-wrap start */}
          <div className="view-modal-body-wrap">
            <div className="left-modal-body-wrap">
              {/* left-wrap start */}
              <div className="left-box">
                {viewItemsLabel.map((chi) => (
                  <p>{chi}</p>
                ))}
              </div>
              {/* left-wrap end */}

              {/*demark....  */}
              <hr className="view-hr-line" />

              {/* right-wrap start */}
              {viewItemsValue.map((chi) => {
                const {
                  name,
                  email_address,
                  phone_number,
                  date_added,
                  last_seen,
                  status,
                } = chi;
                return (
                  <div className="right-box">
                    <p>{name}</p>
                    <p>{capitalizeFirstWord(email_address)}</p>
                    <p>{phone_number}</p>
                    <p>{date_added}</p>
                    <p>{last_seen}</p>
                    <p
                      className={`view-status-text ${
                        status.toLowerCase() === "active"
                          ? "active-status-text"
                          : status.toLowerCase() === "pending"
                          ? "pending-status-text"
                          : ""
                      }`}
                    >
                      {status}
                    </p>
                  </div>
                );
              })}
              {/* right-wrap end */}
            </div>
          </div>
          {/* body-wrap end */}
        </div>

        {/* table-wrap start */}
        {/* <div className="view-user-log-table-wrap"> */}
        <div className="bottom-title-wrap">
          <p className="title">Users Log / Activites</p>
          <Search placeholder="Search activity" className="search-input" />
        </div>

        {/* table start */}
        <TableContainer tableHeadItems={tableHeadList} showPagination>
          {tableBodyList.map((chi, idx) => {
            const { date, activity_name, device, time, ip_address } = chi;
            return (
              <TableBody
                key={idx}
                num={idx}
                one={date}
                two={activity_name}
                three={device}
                four={time}
                five={ip_address}
                action
                customIcon={TrashIcon}
              />
            );
          })}
        </TableContainer>
        {/* table end */}
        {/* </div> */}
        {/* table-wrap end */}
      </div>
    </DashboardLayout>
  );
};
export default ViewUserLog;
