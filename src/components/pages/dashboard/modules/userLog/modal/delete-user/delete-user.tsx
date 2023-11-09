import { RevvexButton } from "../../../../../../buttons/button";
import "./delete-user.css";

interface DeleteUserProp {
  onCancel?: () => void;
  onSubmit?: () => void;
}

const DeleteUser = ({ onCancel, onSubmit }: DeleteUserProp) => {
  return (
    <div className="delete-user-wrap">
      <p className="text">Are you sure you want to delete this user</p>
      <div className="btn-wrap">
        <RevvexButton btnClassName="yes-btn" label="Yes" onClick={onSubmit} />
        <RevvexButton
          btnClassName="cancel-btn"
          label="Cancel"
          onClick={onCancel}
        />
      </div>
    </div>
  );
};
export default DeleteUser;
