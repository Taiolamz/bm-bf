import { HTMLInputTypeAttribute, useState } from "react";
import "./billing-table.css";
import Search from "../../../../../table/tableContainer/search/search";
import Select from "react-select";
import TableContainer from "../../../../../table/tableContainer/main/table-container";
import BankIcon from "../../../../../../assets/bank-icon.svg";
import TableBody from "../../../../../table/tableBody/table-body";
import { capitalizeFirstWord } from "../../../../../helpers/helpers";
import { useDispatch, useSelector } from "react-redux";
import RootState from "../../../../../../redux/types";
import moment from "moment";
import {
  getBillings,
  getBillingsPagination,
} from "../../../../../../redux/Billing";
import useDebounce from "../../../../../helpers/useDebounce";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import {
  BankTransferLogo,
  FlutterWaveLogo,
  HarmBTimesIcon,
  HarmbourgerMenu,
  MasterCardLogo,
  PaystackLogo,
  VisaLogo,
} from "../../../../../../assets/icons/icons";
import { RevvexButton } from "../../../../../buttons/button";
import { FaArrowUp, FaCheck } from "react-icons/fa";
import Flatpickr from "react-flatpickr";
import { Dna } from "react-loader-spinner";

interface BillingTableProps {
  searchVal?: string;
  handleSearchTable?: (e: any) => void;
}

const BillingTable = ({ searchVal, handleSearchTable }: BillingTableProps) => {
  const [showFilterDrop, setShowFilterDrop] = useState(false);
  const [showMoreFilterDrop, setShowMoreFilterDrop] = useState<any>([]);
  const dispatch = useDispatch();
  const { loading, billing } = useSelector((state: RootState) => state.billing);
  const [filterDate, setFilterDate] = useState("");

  const [filterDropdown, setFilterDropdown] = useState<any | []>([
    {
      name: "Date",
      drop: [
        {
          label: "Yesterday",
          is_checked: false,
        },
        {
          label: "Last week",
          is_checked: false,
        },
        {
          label: "Last month",
          is_checked: false,
        },
        {
          label: "Input date",
          value: "",
        },
      ],
    },
    {
      name: "Payment method",
      drop: [
        {
          label: "Visa",
          labelLogo: VisaLogo,
          is_checked: false,
        },
        {
          label: "Flutter",
          labelLogo: FlutterWaveLogo,
          is_checked: false,
        },
        {
          label: "Paystack",
          labelLogo: PaystackLogo,
          is_checked: false,
        },
        {
          label: "Bank transfer",
          labelLogo: BankTransferLogo,
          is_checked: false,
        },
        {
          label: "Mastercard",
          labelLogo: MasterCardLogo,
          is_checked: false,
        },
      ],
    },
    {
      name: "Plan type",
      drop: [
        {
          label: "SME",
          is_checked: false,
        },
        {
          label: "Premium",
          is_checked: false,
        },
        {
          label: "Standard",
          is_checked: false,
        },
        {
          label: "Enterprise",
          is_checked: false,
        },
      ],
    },
  ]);

  const handleChangeItem = (index: any) => {
    if (showMoreFilterDrop.includes(index)) {
      setShowMoreFilterDrop(
        showMoreFilterDrop.filter((item: any) => item !== index)
      );
    } else {
      setShowMoreFilterDrop([...showMoreFilterDrop, index]);
    }
  };

  const handleCheckboxChange = (
    e: any,
    parentIdx: number,
    childIdx: number
  ) => {
    const updatedFilterDropdown = [...filterDropdown];
    updatedFilterDropdown[parentIdx].drop[childIdx].is_checked =
      e.target.checked;
    setFilterDropdown(updatedFilterDropdown);
  };
  const tableHeadList = [
    "Company Name",
    "Email",
    "Payment Method",
    "Plan Type",
    "Plan Start Date",
    "Plan End Date",
    // "Action",
  ];

  const handlePagination = async (param: any) => {
    // console.log(param);
    const splitLink = param.split("/api");
    const linkTwo = splitLink[1];
    const objVal = {
      year: "",
      search: searchVal,
      month: "",
      status: "",
      payment_method: "",
      per_page: 10,
      url: linkTwo,
    };
    dispatch(getBillingsPagination(objVal as any) as any);
  };

  const activateButton = () => {
    let activeBtn: boolean = false;
    const activateBtn = filterDropdown.some((chi: any) =>
      chi.drop.some((check: any) => check.is_checked)
    );
    activeBtn = filterDate || activateBtn;
    return activeBtn;
  };

  const getCheckedLabels = (name: any) => {
    const drop =
      filterDropdown.find((chi: any) => chi.name === name)?.drop || [];
    const checkedLabels = drop
      .filter((chi: any) => chi.is_checked)
      .map((chi: any) => chi.label);

    return checkedLabels;
  };

  const handleFilter = async (e: any) => {
    e.preventDefault();
    const obj: any = {
      year: "",
      month: "",
      status: "",
      payment_method: getCheckedLabels("Payment method"),
    };
    const data = await dispatch(getBillings(obj) as any);
    if (data?.payload?.status === 200) {
      setShowFilterDrop(false);
      setShowMoreFilterDrop([]);
      setFilterDropdown([
        {
          name: "Date",
          drop: [
            {
              label: "Yesterday",
              is_checked: false,
            },
            {
              label: "Last week",
              is_checked: false,
            },
            {
              label: "Last month",
              is_checked: false,
            },
            {
              label: "Input date",
              value: "",
            },
          ],
        },
        {
          name: "Payment method",
          drop: [
            {
              label: "Visa",
              labelLogo: VisaLogo,
              is_checked: false,
            },
            {
              label: "Flutter",
              labelLogo: FlutterWaveLogo,
              is_checked: false,
            },
            {
              label: "Paystack",
              labelLogo: PaystackLogo,
              is_checked: false,
            },
            {
              label: "Bank transfer",
              labelLogo: BankTransferLogo,
              is_checked: false,
            },
            {
              label: "Mastercard",
              labelLogo: MasterCardLogo,
              is_checked: false,
            },
          ],
        },
        {
          name: "Plan type",
          drop: [
            {
              label: "SME",
              is_checked: false,
            },
            {
              label: "Premium",
              is_checked: false,
            },
            {
              label: "Standard",
              is_checked: false,
            },
            {
              label: "Enterprise",
              is_checked: false,
            },
          ],
        },
      ]);
    }
  };

  return (
    <div className="billing-table-wrap">
      <div className="table-top-wrap">
        {/* search wrap start */}
        <Search
          handleSearchTable={handleSearchTable}
          searchValue={searchVal}
          className="search-input"
          placeholder={"search"}
        />
        {/* search wrap end */}

        {/* filter export wrap start */}
        <div className="filter-export-wrap">
          {/* advanced filter wrap start */}
          <div
            className={`adv-filter-wrap ${
              showFilterDrop && "adv-filter-wraps"
            }`}
          >
            <div
              onClick={() => setShowFilterDrop(!showFilterDrop)}
              className={`adv-filter ${showFilterDrop && "adv-filters"}`}
            >
              {!showFilterDrop && (
                <>
                  <p>Advanced Filter</p>
                  <IoIosArrowDown />
                </>
              )}

              {showFilterDrop && (
                <>
                  <p>Filter by</p>
                  <IoIosArrowUp color="var(--blue-color)" />
                </>
              )}
            </div>

            {showFilterDrop && (
              <div className="filter-drop-wrap">
                {filterDropdown?.map((chi: any, parentIdx: any) => {
                  const { name, drop } = chi;
                  return (
                    <div key={parentIdx} className="filter-drop-box">
                      <div
                        className="name-wrap"
                        onClick={() => {
                          handleChangeItem(parentIdx);
                        }}
                      >
                        <p className="name">{name}</p>
                        {!showMoreFilterDrop.includes(parentIdx) && (
                          <figure>{HarmbourgerMenu}</figure>
                        )}
                        {showMoreFilterDrop.includes(parentIdx) && (
                          <figure>{HarmBTimesIcon}</figure>
                        )}
                      </div>
                      {/* child dropdown start */}
                      {showMoreFilterDrop.includes(parentIdx) && (
                        <div className="child-dropdown-wrap">
                          {drop?.map((chi: any, childIdx: any) => {
                            const { label, is_checked, labelLogo } = chi;
                            return (
                              <div
                                key={childIdx}
                                className="child-dropdown-box"
                              >
                                {label !== "Input date" && (
                                  <input
                                    type="checkbox"
                                    checked={is_checked}
                                    id={`${label}_check`}
                                    name={`${label}_check`}
                                    className="check-input"
                                    onChange={(e: any) =>
                                      handleCheckboxChange(
                                        e,
                                        parentIdx,
                                        childIdx
                                      )
                                    }
                                  />
                                )}
                                {label === "Input date" && (
                                  <Flatpickr
                                    type="text"
                                    className="field-input"
                                    placeholder={"Input date"}
                                    value={filterDate}
                                    onChange={(date: any) =>
                                      setFilterDate(
                                        moment(date[0]).format("YYYY-MM-DD")
                                      )
                                    }
                                  />
                                )}
                                {label !== "Input date" && (
                                  <label
                                    htmlFor={`${label}_check`}
                                    className="check-label"
                                  >
                                    {parentIdx !== 1 && <p>{label}</p>}
                                    <figure>{labelLogo}</figure>
                                    <figure className="check-square">
                                      <FaCheck className="icon" />
                                    </figure>
                                  </label>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                      {/* child dropdown end */}
                    </div>
                  );
                })}
                {loading ? (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Dna width={50} height={40} />
                  </div>
                ) : (
                  <RevvexButton
                    label="Filter"
                    btnClassName="btn"
                    bgColor={!activateButton() ? "var(--disable-color)" : ""}
                    onClick={(e: any) =>
                      activateButton() ? handleFilter(e) : null
                    }
                    btnType="button"
                    style={{
                      cursor: !activateButton() ? "not-allowed" : "",
                      color: !activateButton()
                        ? "var(--disable-mid-color)"
                        : "",
                    }}
                  />
                )}
              </div>
            )}
          </div>
          {/* advanced filter wrap end */}

          {/* <Select placeholder=" Advanced Filter" /> */}
          <div className="export-wrap">
            <FaArrowUp className="icon" />
            <p> Export</p>
          </div>
        </div>
        {/* filter export wrap end */}
      </div>

      {/* bottom-table-wrap start */}
      <TableContainer
        fromPage={billing?.billing?.from || 1}
        toPage={billing?.billing?.to || billing?.billing?.data?.length}
        totalPage={billing?.billing?.total || billing?.billing?.data?.length}
        nextPage={billing?.billing?.next_page_url}
        prevPage={billing?.billing?.prev_page_url}
        onNextPage={() => handlePagination(billing?.billing?.next_page_url)}
        onPrevPage={() => handlePagination(billing?.billing?.prev_page_url)}
        showPagination
        tableHeadItems={tableHeadList}
        massCheck
      >
        {billing?.billing?.data?.map((chi: any, idx: any) => {
          const {
            // email,
            payment_method,
            // plan_type,
            // plan_start_date,
            // plan_end_date,
            attributes,
          } = chi || {};
          return (
            <TableBody
              showOddEvenBody
              checkBox
              key={idx}
              num={idx}
              loading={loading}
              one={attributes?.organization?.company_name || "---"}
              payment={payment_method || "---"}
              paymentIcon={payment_method?.icon || BankIcon}
              two={attributes?.email || "---"}
              three={attributes?.plan_type || "---"}
              four={moment(attributes?.start_date).format("YYYY - MM - DD")}
              five={moment(attributes?.end_date).format("YYYY - MM - DD")}
            //   action
            />
          );
        })}
      </TableContainer>
      {/* bottom-table-wrap end */}
    </div>
  );
};
export default BillingTable;
