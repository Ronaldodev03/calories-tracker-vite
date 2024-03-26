import { CiEdit } from "react-icons/ci";
import { Activity } from "../types";
import { ActivityActions } from "../reducers/activity-reducer";
import { Dispatch } from "react";

//types
type ActivityButtonProps = {
  dispatch: Dispatch<ActivityActions>;
  activity: Activity;
  goToFormSection: () => void;
};

const EditButton = ({
  dispatch,
  activity,
  goToFormSection,
}: ActivityButtonProps) => {
  return (
    <button
      //con el onclick se llama la action throght el dispatch y se pasa el payload (la info)
      aria-label="edit button"
      onClick={() => {
        goToFormSection();
        return dispatch({
          type: "set-activeId",
          payload: { id: activity.id },
        });
      }}
    >
      <CiEdit aria-label="edit button" size={36} />
    </button>
  );
};

export default EditButton;
