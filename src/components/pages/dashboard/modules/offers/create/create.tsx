import { ChangeEventHandler, ReactNode, useEffect, useState } from "react";
import DashboardLayout from "../../../layout/dashboardLayout/dashboard-layout";
import { EventChange } from "../../../../../types/types";
import "./create.css";
import Select from "react-select";
import { RevvexButton } from "../../../../../buttons/button";
import { CheckIcon } from "../../../../../../assets/icons/icons";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import RootState from "../../../../../../redux/types";
import { getPrivileges } from "../../../../../../redux/Offers";

interface CreateOffersType {
  title: string;
  trial_duration: string;
  yearly_price: string;
  monthly_price: string;
  discount: string;
  privileges: string[];
  subsidiaries: string;
  branches: string;
  organisation: string;
  users: string;
}

interface FeatureDetailsType {
  label: string;
  is_checked: boolean;
  value: string;
}

interface SelectOption {
  label: string;
  value: string;
}

const CreateOffers = () => {
  const dispatch = useDispatch();
  const { loading, privileges } = useSelector(
    (state: RootState) => state.offers
  );
  const [details, setDetails] = useState<CreateOffersType>({
    title: "",
    trial_duration: "",
    yearly_price: "",
    monthly_price: "",
    discount: "",
    privileges: [],
    subsidiaries: "",
    branches: "",
    organisation: "",
    users: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const data = { ...details, [name]: value };
    setDetails(data);
  };

  useEffect(() => {
    dispatch(getPrivileges({}) as any);
  }, []);

  const featureOptions: SelectOption[] = [
    {
      label: "0-5",
      value: "0-5",
    },
    {
      label: "5-10",
      value: "5-10",
    },
    {
      label: "10-15",
      value: "10-15",
    },
    {
      label: "15-20",
      value: "15-20",
    },
  ];

  const [featureDetails, setFeatureDetails] = useState<FeatureDetailsType[]>([
    {
      label: "Subsidiaries",
      is_checked: false,
      value: "",
    },
    {
      label: "Branches",
      is_checked: false,
      value: "",
    },
    {
      label: "Organisation",
      is_checked: false,
      value: "",
    },
    {
      label: "Users",
      is_checked: false,
      value: "",
    },
  ]);

  return (
    <DashboardLayout pageTitle={"Offers & Plans"} goBack>
      <div className="create-offer-wrap">
        {/* form-wrap start */}
        <div className="form-wrap">
          <p className="title" onClick={() => console.log(privileges, "chai")}>
            Plan Information
          </p>
          <div className="form-group">
            {/*  form input box start*/}
            <div className="form-box">
              <label>Title</label>
              <input
                type="text"
                name="title"
                id="title"
                value={details.title}
                className={`form-input ${
                  details.title ? "active-form-input" : ""
                }`}
                placeholder="Add a descriptive title"
                onChange={handleChange}
              />
            </div>
            {/*  form input box end*/}

            {/*  form input box start*/}
            <div className="form-box">
              <label>Trial duration (days)</label>
              <input
                type="number"
                id="trial_duration"
                name="trial_duration"
                value={details.trial_duration}
                className={`form-input ${
                  details.trial_duration ? "active-form-input" : ""
                }`}
                placeholder="e.g 7"
                onChange={handleChange}
              />
            </div>
            {/*  form input box end*/}
          </div>
        </div>
        {/* form wrap end */}

        {/* form-wrap start */}
        <div className="form-wrap">
          <p className="title">Pricing Information</p>
          <div className="form-group">
            {/*  form input box start*/}
            <div className="form-box">
              <label>Yearly Price</label>
              <NumericFormat
                type="text"
                name="yearly_price"
                id="yearly_price"
                className={`form-input ${
                  details.yearly_price ? "active-form-input" : ""
                }`}
                placeholder="Enter yearly price"
                onChange={handleChange}
                value={details.yearly_price}
                decimalScale={3}
                decimalSeparator="."
                allowNegative
                thousandSeparator={","}
              />
            </div>
            {/*  form input box end */}

            {/*  form input box start */}
            <div className="form-box">
              <label>Monthly Price</label>
              <NumericFormat
                type="text"
                className={`form-input ${
                  details.monthly_price ? "active-form-input" : ""
                }`}
                onChange={handleChange}
                value={details.monthly_price}
                name="monthly_price"
                id="monthly_price"
                placeholder="Enter monthly price"
                decimalScale={3}
                decimalSeparator="."
                allowNegative
                thousandSeparator={","}
              />
            </div>
            {/*  form input box end */}

            {/*  form input box start*/}
            <div className="form-box">
              <label>Discount %</label>
              <Select
                className={`discount-select-input ${
                  details.discount ? "select-input-active" : ""
                }`}
                placeholder="10%"
                // onChange={handleChange}
                value={details.discount}
                options={[]}
              />
            </div>
            {/*  form input box end*/}
          </div>
        </div>
        {/* form wrap end */}

        {/* form-wrap start */}
        <div className="form-wrap">
          <p className="title">Privilges</p>
          <div className="form-group">
            {/*  form input box start*/}
            <div className="form-box">
              <Select
                className={`privilege-select-input ${
                  details.privileges ? "select-input-active" : ""
                }`}
                isMulti
                placeholder="Enter Privileges"
                value={details.privileges}
                options={privileges}
                onChange={(e: any) =>
                  setDetails((prev) => {
                    return { ...prev, privileges: e };
                  })
                }
              />
            </div>
            {/*  form input box end*/}
          </div>
        </div>
        {/* form wrap end */}

        {/* form-wrap start */}
        <div className="form-wrap">
          <p className="title">Features</p>
          <div className="feature-form-wrap">
            {/*  form input box start*/}
            {featureDetails.map((chi: any, idx) => {
              const { label, value, is_checked } = chi;
              return (
                <div key={idx} className="feature-form-box">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    id={`${label}_check`}
                    name={`${label}_check`}
                    checked={is_checked}
                    onChange={(e: any) => {
                      setFeatureDetails((prev) =>
                        prev.map((child) =>
                          child.label === label
                            ? { ...child, is_checked: e.target.checked }
                            : child
                        )
                      );
                    }}
                  />
                  <label
                    htmlFor={`${label}_check`}
                    className="form-check-label"
                  >
                    <div className="check-circle">
                      <figure className="check-icon">
                        <CheckIcon disableColor={!is_checked} />
                      </figure>
                    </div>
                    <p>{label}</p>
                  </label>
                  <Select
                    className={`feature-select-input ${
                      value ? "feature-select-active" : ""
                    }`}
                    placeholder="0-5"
                    value={value}
                    getOptionLabel={(label: SelectOption) => label.label}
                    getOptionValue={(value: SelectOption) => value.value}
                    options={featureOptions}
                    onChange={(e: any) => {
                      setFeatureDetails((prev) =>
                        prev.map((child) =>
                          child.label === label ? { ...child, value: e } : child
                        )
                      );
                    }}
                  />
                </div>
              );
            })}
            {/* add feature box start */}
            <RevvexButton
              btnType="button"
              label="Add Feature"
              btnClassName="feature-btn"
              plusIcon
            />

            {/* add feature box end */}
            {/*  form input box end*/}
          </div>
        </div>
        {/* form wrap end */}
      </div>
    </DashboardLayout>
  );
};
export default CreateOffers;
