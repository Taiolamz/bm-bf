import { useState } from "react";
import UserImg from "../../../../../../assets/User-Img.svg";
import { UploadIcon } from "../../../../../../assets/icons/icons";
import Select from "react-select";
import { RevvexButton } from "../../../../../buttons/button";
import "./profile.css";

interface UserDetails {
  profile_photo: any;
  first_name: string;
  last_name: string;
  email: string;
  gender: any;
  role: string;
  about_me: string;
  //   user_display: any;
}
interface GenderOptions {
  label: string;
  value: string;
}

const Profile = () => {
  const [details, setDetails] = useState<UserDetails>({
    profile_photo: "",
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    role: "",
    about_me: "",
    // user_display: {},
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const data = { ...details, [name]: value };
    setDetails(data);
  };

  const genderOptions: GenderOptions[] = [
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
    {
      label: "I prefer not to say",
      value: "balablue",
    },
  ];

  const activeBtn = () => {
    let btn: any = false;
    btn =
      details.first_name &&
      details.last_name &&
      details.email &&
      details.role &&
      details.about_me &&
      details.gender;
    return btn;
  };

  const handleSubmit = () => {
    // coming soon
  };

  return (
    <div className="profile-wrap">
      {/* form-wrap start */}
      <div className="form-wrap">
        <p className="profile-text">Profile Photo</p>

        {/* profile photo wrap start */}
        <div className="profile-photo-wrap">
          <img
            src={
              details.profile_photo
                ? URL.createObjectURL(details.profile_photo)
                : UserImg
            }
            className="img"
            alt="profile_image"
          />

          <input
            type="file"
            name="profile_photo"
            accept=".jpg, .jpeg, .png"
            id="profile_photo"
            className="profile_picture_input"
            onChange={(e: any) =>
              setDetails((prev) => {
                console.log(e);
                return {
                  ...prev,
                  profile_photo: e.target.files[0],
                  //   user_display: e.target.files[0],
                };
              })
            }
          />
          <label htmlFor="profile_photo" className="label-wrap">
            <figure className="icon">{UploadIcon}</figure>
          </label>
          <p className="note-text">
            Only standard format are allowed Png. Jpeg. files no more than 2mb
          </p>
        </div>
        {/* profile photo wrap end */}

        {/* input-field wrap start */}
        <div className="field-wrap">
          <p className="title">Profile Information</p>
          <br />
          {/* field-wrap start */}
          <div className="field-box">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              placeholder="Hassan"
              className={`input ${details.first_name ? "input-active" : ""}`}
              value={details.first_name}
              onChange={handleChange}
            />
          </div>
          {/* field-wrap end */}

          {/* field-wrap start */}
          <div className="field-box">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              placeholder="Lamidi"
              className={`input ${details.last_name ? "input-active" : ""}`}
              value={details.last_name}
              onChange={handleChange}
            />
          </div>
          {/* field-wrap end */}

          {/* field-wrap start */}
          <div className="field-box">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              className={`input ${details.email ? "input-active" : ""}`}
              placeholder="hlamidi@zojatech.com"
              value={details.email}
              onChange={handleChange}
            />
          </div>

          {/* field-wrap end */}

          {/* field-wrap start */}
          <div className="field-box">
            <label htmlFor="gender">Gender</label>
            <Select
              id="gender"
              name="gender"
              value={details.gender}
              className="input"
              getOptionLabel={(label: any) => label.label}
              getOptionValue={(value: any) => value.value}
              onChange={(e: any) =>
                setDetails((prev) => {
                  return { ...prev, gender: e };
                })
              }
              options={genderOptions}
            />
          </div>
          {/* field-wrap end */}

          {/* field-wrap start */}
          <div className="field-box">
            <label htmlFor="role">Role</label>
            <input
              type="text"
              id="role"
              name="role"
              placeholder="Super Admin"
              className={`input ${details.role ? "input-active" : ""}`}
              value={details.role}
              onChange={handleChange}
            />
          </div>
          {/* field-wrap end */}
          {/* field-wrap start */}
          <br />
          <div className="field-box">
            <label htmlFor="Role">About Me</label>
            <textarea
              id="about_me"
              name="about_me"
              className={`input text-area ${
                details.about_me ? "input-active" : ""
              }`}
              rows={5}
              placeholder="Tell us more..."
              value={details.about_me}
              onChange={handleChange}
            />
          </div>
          {/* field-wrap end */}
        </div>
        <RevvexButton
          bgColor={activeBtn() ? "var(--blue-color)" : "var(--disable-color)"}
          style={{
            color: activeBtn()
              ? "var(--white-color)"
              : "var(--disable-mid-color)",
            cursor: activeBtn() ? "pointer" : "not-allowed",
          }}
          btnType="submit"
          onClick={() => activeBtn() && handleSubmit}
          btnDisable={!activeBtn()}
          label="Update Profile"
          btnClassName="btn"
        />
        {/* input-field wrap end */}
      </div>
      {/* form-wrap end */}
    </div>
  );
};
export default Profile;
