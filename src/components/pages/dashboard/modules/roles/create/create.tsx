import { useState } from "react";
import DashboardLayout from "../../../layout/dashboardLayout/dashboard-layout";
import Select from "react-select";
import { FaCheck } from "react-icons/fa";
import "./create.css";
import { RevvexButton } from "../../../../../buttons/button";
import RootState from "../../../../../../redux/types";
import { useSelector, useDispatch } from "react-redux";
import { createRole } from "../../../../../../redux/roles";
import { Dna } from "react-loader-spinner";

interface DetailsType {
  name: string;
  user: any;
  permissions: any;
}

interface UserOptions {
  label: string;
  value: string;
}

const CreateRoles = () => {
  const { loading } = useSelector((state: RootState) => state.roles);
  const dispatch = useDispatch();
  const [details, setDetails] = useState<DetailsType>({
    name: "",
    user: "",
    permissions: [
      {
        title: "Reports",
        checkboxes: [
          {
            label: "view reports",
            is_checked: false,
          },
          {
            label: "archive report",
            is_checked: false,
          },
          {
            label: "share report",
            is_checked: false,
          },
          {
            label: "delete report",
            is_checked: false,
          },
        ],
      },
      {
        title: "Supports",
        checkboxes: [
          {
            label: "view chats",
            is_checked: false,
          },
          {
            label: "reply chats",
            is_checked: false,
          },
          {
            label: "create tickets",
            is_checked: false,
          },
          {
            label: "modify ticket",
            is_checked: false,
          },
          {
            label: "view blacklist",
            is_checked: false,
          },
          {
            label: "reactivate customer",
            is_checked: false,
          },
        ],
      },
      {
        title: "Users",
        checkboxes: [
          {
            label: "create users",
            is_checked: false,
          },
          {
            label: "view users",
            is_checked: false,
          },
          {
            label: "edit users",
            is_checked: false,
          },
          {
            label: "delete users",
            is_checked: false,
          },
        ],
      },
      {
        title: "Roles",
        checkboxes: [
          {
            label: "create roles",
            is_checked: false,
          },
          {
            label: "view roles",
            is_checked: false,
          },
          {
            label: "edit roles",
            is_checked: false,
          },
          {
            label: "delete roles",
            is_checked: false,
          },
        ],
      },
      {
        title: "Settings",
        checkboxes: [
          {
            label: "account",
            is_checked: false,
          },
          {
            label: "notification",
            is_checked: false,
          },
        ],
      },
    ],
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const data = { ...details, [name]: value };
    setDetails(data);
  };

  const userOptions: UserOptions[] = [
    {
      label: "Hassan Lamidi",
      value: "01",
    },
    {
      label: "Ayeni Kehinde",
      value: "02",
    },
    {
      label: "Hassan Ayeni",
      value: "03",
    },
  ];

  const handleCheckboxChange = (e: any, label: any) => {
    const data = details.permissions.map((chi: any) => {
      return {
        ...chi,
        checkboxes: chi.checkboxes.map((child: any) =>
          child.label === label
            ? { ...child, is_checked: e.target.checked }
            : child
        ),
      };
    });
    setDetails((prev) => {
      return { ...prev, permissions: data };
    });

    // grab each checkbox and their label
    // OR
    // update on the handleSubmit
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { name, user, permissions } = details;
    const newPermissions = permissions.reduce((a: any, b: any) => {
      return a.concat(
        b.checkboxes
          .filter((chi: any) => chi.is_checked)
          .map((child: any) => child.label)
      );
    }, []);
    const obj: any = {
      name,
      user: user?.value,
      permissions: newPermissions,
    };
    console.log(obj);
    const data = await dispatch(createRole(obj) as any);
    if(data?.payload?.status === 200) {

        console.log(data);
    }
  };

  const activateButton = () => {
    let activeBtn: any = false;
    const activeCheckbox = details.permissions.some((chi: any) =>
      chi.checkboxes.some((check: any) => check.is_checked)
    );
    activeBtn = details.name && details.user && activeCheckbox;
    return activeBtn;
  };

  return (
    <DashboardLayout pageTitle="Roles & Permission" goBack>
      <div className="create-roles-wrap">
        <p className="title" onClick={activateButton}>
          Roles Overview
        </p>

        {/* form wrap start */}
        <form className="form-wrap">
          {/* input wrap start */}
          <div className="form-input-wrap">
            {/* form input box start */}
            <div className="form-input-box">
              <label>Role Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Hassan Lamidi"
                className="form-input"
                value={details.name}
                onChange={handleChange}
              />
            </div>
            {/* form input box end */}

            {/* form input box start */}
            <div className="form-input-box">
              <label>User</label>
              <Select
                placeholder="Select user"
                className="select-input"
                value={details.user}
                getOptionLabel={(label: UserOptions) => label.label}
                getOptionValue={(value: UserOptions) => value.value}
                options={userOptions}
                onChange={(e: any) =>
                  setDetails((prev) => {
                    return { ...prev, user: e };
                  })
                }
              />
            </div>
            {/* form input box end */}
          </div>
          {/* input wrap end */}

          {/* form-check-wrap start */}
          <div className="form-check-wrap">
            {details.permissions.map((chi: any, idx: any) => {
              const { title, checkboxes } = chi;
              return (
                <div key={idx} className="form-checkbox-group">
                  <p className="check-title">{title}</p>
                  <div className="form-checkbox-box">
                    {checkboxes.map((child: any, indx: any) => {
                      const { label, is_checked } = child;
                      return (
                        <div key={indx}>
                          <input
                            type="checkbox"
                            id={`${label}_check`}
                            className="check-input"
                            name={`${label}_check`}
                            checked={is_checked}
                            onChange={(e: any) =>
                              handleCheckboxChange(e, label)
                            }
                          />
                          <label
                            htmlFor={`${label}_check`}
                            className="check-label"
                          >
                            <span>{label}</span>
                            <figure className="check-square">
                              <FaCheck className="icon" />
                            </figure>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {loading ? (
            // <div >
            <Dna width={60} height={60} />
          ) : (
            // </div>
            <RevvexButton
              label="Create Role"
              btnClassName="btn"
              bgColor={!activateButton() ? "var(--disable-color)" : ""}
              onClick={(e: any) => (activateButton() ? handleSubmit(e) : null)}
              btnType="button"
              style={{
                cursor: !activateButton() ? "not-allowed" : "",
                color: !activateButton() ? "var(--disable-mid-color)" : "",
              }}
            />
          )}

          {/* form-check-wrap end */}
        </form>
        {/* form wrap end */}
      </div>
    </DashboardLayout>
  );
};

export default CreateRoles;
