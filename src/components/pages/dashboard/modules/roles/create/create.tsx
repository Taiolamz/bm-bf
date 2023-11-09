import { useState } from "react";
import DashboardLayout from "../../../layout/dashboardLayout/dashboard-layout";
import Select from "react-select";
import { FaCheck } from "react-icons/fa";
import "./create.css";
import { RevvexButton } from "../../../../../buttons/button";

interface DetailsType {
  role_name: string;
  user: any;
}

interface UserOptions {
  label: string;
  value: string;
}

const CreateRoles = () => {
  const [details, setDetails] = useState<DetailsType>({
    role_name: "",
    user: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const data = { ...details, [name]: value };
    setDetails(data);
  };

  const userOptions: UserOptions[] = [
    {
      label: "Hassan Lamidi",
      value: "hassan",
    },
    {
      label: "Ayeni Kehinde",
      value: "kehinde",
    },
    {
      label: "Hassan Ayeni",
      value: "akhot  :)",
    },
  ];

  const [detailsChecked, setDetailsCheck] = useState([
    {
      title: "Reports",
      checkboxes: [
        {
          label: "View Reports",
          is_checked: false,
        },
        {
          label: "Archive Report",
          is_checked: false,
        },
        {
          label: "Share Report",
          is_checked: false,
        },
        {
          label: "Delete Report",
          is_checked: false,
        },
      ],
    },
    {
      title: "Supports",
      checkboxes: [
        {
          label: "View Chats",
          is_checked: false,
        },
        {
          label: "Reply Chats",
          is_checked: false,
        },
        {
          label: "Create Tickets",
          is_checked: false,
        },
        {
          label: "Modify Ticket",
          is_checked: false,
        },
        {
          label: "View Blacklist",
          is_checked: false,
        },
        {
          label: "Reactivate Customer",
          is_checked: false,
        },
      ],
    },
    {
      title: "Users",
      checkboxes: [
        {
          label: "Create Users",
          is_checked: false,
        },
        {
          label: "View Users",
          is_checked: false,
        },
        {
          label: "Edit Users",
          is_checked: false,
        },
        {
          label: "Delete Users",
          is_checked: false,
        },
      ],
    },
    {
      title: "Roles",
      checkboxes: [
        {
          label: "Create Roles",
          is_checked: false,
        },
        {
          label: "View Roles",
          is_checked: false,
        },
        {
          label: "Edit Roles",
          is_checked: false,
        },
        {
          label: "Delete Roles",
          is_checked: false,
        },
      ],
    },
    {
      title: "Settings",
      checkboxes: [
        {
          label: "Account",
          is_checked: false,
        },
        {
          label: "Notification",
          is_checked: false,
        },
      ],
    },
  ]);

  const handleCheckboxChange = (e: any, label: any) => {
    const data = detailsChecked.map((chi) => {
      return {
        ...chi,
        checkboxes: chi.checkboxes.map((child) =>
          child.label === label
            ? { ...child, is_checked: e.target.checked }
            : child
        ),
      };
    });
    setDetailsCheck(data);

    // grab each checkbox and their label
  };

//   const ActiveBtn = () => {
//     const checked = detailsChecked.map((chi, idx) =>
//       chi.checkboxes.map((child) => child.is_checked === true)
//     );
//     // console.log(checked, "show");
//     const setChecked = checked.map((chi, idx) => chi);
//     console.log(setChecked, "show-case");
//     let btn: any = false;
//     // btn = checked.includes(true);
//     return btn;
//   };

//   ActiveBtn();

  return (
    <DashboardLayout pageTitle="Roles & Permission" goBack>
      <div className="create-roles-wrap">
        <p className="title">Roles Overview</p>

        {/* form wrap start */}
        <form className="form-wrap">
          {/* input wrap start */}
          <div className="form-input-wrap">
            {/* form input box start */}
            <div className="form-input-box">
              <label>Role Name</label>
              <input
                type="text"
                id="role_name"
                name="role_name"
                placeholder="Hassan Lamidi"
                className="form-input"
                value={details.role_name}
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
            {detailsChecked.map((chi, idx) => {
              const { title, checkboxes } = chi;
              return (
                <div key={idx} className="form-checkbox-group">
                  <p className="check-title">{title}</p>
                  <div className="form-checkbox-box">
                    {checkboxes.map((child, indx) => {
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

          <RevvexButton
            label="Create Role"
            btnClassName="btn"
            onClick={() => {
              "you go run this one";
            }}
          />

          {/* form-check-wrap end */}
        </form>
        {/* form wrap end */}
      </div>
    </DashboardLayout>
  );
};

export default CreateRoles;
