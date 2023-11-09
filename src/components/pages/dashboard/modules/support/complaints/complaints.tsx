import { useState } from "react";
import TableBody from "../../../../../table/tableBody/table-body";
import TableContainer from "../../../../../table/tableContainer/main/table-container";
import "./complaints.css";

const Complaints = () => {
  const [indexNo, setIndexNo] = useState<any>("");
  const tableHeadList = [
    "Sender ",
    "Complaints type",
    "Description",
    "Date",
    "Time",
    "Action",
  ];

  const tableBodyList = [
    {
      sender: "Hassan Lamidi",
      complaint_type: "Money complain",
      description: "The game cut",
      date: "12/09/1847",
      time: "12:00am",
    },
    {
      sender: "Hassan Lamidi",
      complaint_type: "Money complain",
      description: "The game cut",
      date: "12/09/1847",
      time: "12:00am",
    },
    {
      sender: "Hassan Lamidi",
      complaint_type: "Money complain",
      description: "The game cut",
      date: "12/09/1847",
      time: "12:00am",
    },
  ];
  return (
    <div className="complaints-wrap">
      <div className="text-wrap">
        <p className="title">Recieved Complaints</p>
        <p className="sub-text">
          This table contains all complaints or queries received from the Revvex
          in-app support system
        </p>
      </div>

      {/* table wrap start */}
      <TableContainer tableHeadItems={tableHeadList} massCheck>
        {tableBodyList.map((chi, idx) => {
          const { sender, complaint_type, description, date, time } = chi;
          return (
            <TableBody
              checkBox
              key={idx}
              num={idx}
              one={sender}
              two={complaint_type}
              three={description}
              four={date}
              five={time}
              action
              setIndexNo={() => setIndexNo(idx)}
              indexNo={indexNo}
            />
          );
        })}
      </TableContainer>
      {/* table wrap end */}
    </div>
  );
};

export default Complaints;
