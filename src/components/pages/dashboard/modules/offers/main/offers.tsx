import { useNavigate } from "react-router-dom";
import { RevvexButton } from "../../../../../buttons/button";
import TableBody from "../../../../../table/tableBody/table-body";
import TableContainer from "../../../../../table/tableContainer/main/table-container";
import DashboardLayout from "../../../layout/dashboardLayout/dashboard-layout";
import "./offers.css";
import { useDispatch, useSelector } from "react-redux";
import RootState from "../../../../../../redux/types";
import { getOffers } from "../../../../../../redux/Offers";
import { useEffect } from "react";

const Offers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { loading, offers } = useSelector((state: RootState) => state.offers);
  const tableHeadList = [
    "Plans",
    "Pricing",
    "Subsidiary",
    "Branches",
    "Organisation",
    "Users",
    "Action",
  ];

  // const handleGetOffers = async () => {
  //   const obj: any = {};
  //   await dispatch(getOffers(obj) as any);
  // };

  // useEffect(() => {
  //   handleGetOffers();
  // }, []);

  const tableBodyList = [
    {
      plans: "SME",
      pricing: "50,000",
      subsidiary: "1 subsidiary",
      branches: "No Branches",
      organisation: "No Organization",
      users: "1-5 Users",
    },

    {
      plans: "SME",
      pricing: "50,000",
      subsidiary: "1 subsidiary",
      branches: "No Branches",
      organisation: "No Organization",
      users: "1-5 Users",
    },

    {
      plans: "SME",
      pricing: "50,000",
      subsidiary: "1 subsidiary",
      branches: "No Branches",
      organisation: "No Organization",
      users: "1-5 Users",
    },
    {
      plans: "SME",
      pricing: "50,000",
      subsidiary: "1 subsidiary",
      branches: "No Branches",
      organisation: "No Organization",
      users: "1-5 Users",
    },
    {
      plans: "SME",
      pricing: "50,000",
      subsidiary: "1 subsidiary",
      branches: "No Branches",
      organisation: "No Organization",
      users: "1-5 Users",
    },
    {
      plans: "SME",
      pricing: "50,000",
      subsidiary: "1 subsidiary",
      branches: "No Branches",
      organisation: "No Organization",
      users: "1-5 Users",
    },
    {
      plans: "SME",
      pricing: "50,000",
      subsidiary: "1 subsidiary",
      branches: "No Branches",
      organisation: "No Organization",
      users: "1-5 Users",
    },
  ];

  return (
    <DashboardLayout pageTitle="Offers & Plans" goBack>
      <div className="offers-wrap">
        {/* top-wrap start */}
        <div className="offer-top-wrap">
          <div className="title-wrap">
            <p className="title" >
              Available Plans
            </p>
            <p className="info">
              Click one of the available plans below and edit to create a
              discount offer
            </p>
          </div>
          <RevvexButton
            btnClassName="offers-create-btn"
            btnType={"button"}
            label={"Create New Plan"}
            onClick={() => navigate("/dashboard-offers-create")}
          />
        </div>
        {/* top-wrap end */}

        {/* table-wrap start */}
        <TableContainer
          tableHeadItems={tableHeadList}
          dontShowserialNo
          className="offers-table-wrap"
        >
          {tableBodyList.map((chi, idx) => {
            const {
              plans,
              pricing,
              subsidiary,
              branches,
              organisation,
              users,
            } = chi;
            return (
              <TableBody
                dontShowserialNo
                showOddEvenBody
                key={idx}
                one={plans}
                two={pricing}
                three={subsidiary}
                four={branches}
                five={organisation}
                six={users}
                editDeleteAction
              />
            );
          })}
        </TableContainer>
        {/* table-wrap end */}
      </div>
    </DashboardLayout>
  );
};

export default Offers;
