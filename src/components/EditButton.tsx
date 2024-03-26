import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Activity } from "../types";
import { ActivityActions } from "../reducers/activity-reducer";
import { Dispatch } from "react";

//types
type ActivityButtonProps = {
  dispatch: Dispatch<ActivityActions>;
  activity: Activity;
};

const EditButton = ({ dispatch, activity }: ActivityButtonProps) => {
  return (
    <button
      //con el onclick se llama la action throght el dispatch y se pasa el payload (la info)
      aria-label="edit button"
      onClick={() => {
        return dispatch({
          type: "set-activeId",
          payload: { id: activity.id },
        });
      }}
    >
      <PencilSquareIcon
        aria-label="edit button"
        className="h-8 w-8 text-gray-800"
      />
    </button>
  );
};

export default EditButton;
