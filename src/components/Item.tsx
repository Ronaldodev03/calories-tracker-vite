import { Activity } from "../types";
import { Dispatch } from "react";
import { ActivityActions } from "../reducers/activity-reducer";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { Reorder } from "framer-motion";
import EditButton from "./EditButton";

type ItemProps = {
  activity: Activity;
  saveOrder: () => void;
  categoryName: (category: Activity["category"]) => string[];
  dispatch: Dispatch<ActivityActions>;
};
const Item = ({ activity, saveOrder, categoryName, dispatch }: ItemProps) => {
  return (
    <Reorder.Item
      value={activity}
      onDragEnd={saveOrder} // para el reducer (o la DB si hay)
    >
      <div className="px-5 py-10 bg-white mt-5 flex justify-between shadow">
        <div className="space-y-2 relative">
          <p
            className={` absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold 
                ${activity.category === 1 ? "bg-[#FF0000]" : "bg-lime-500"}`}
          >
            {categoryName(+activity.category)}
          </p>

          <p className="text-2xl font-bold capitalize">{activity.name}</p>
          <p className="font-black text-3xl sm:text-4xl text-blue-500">
            {activity.calories} {""}
            <span>Calorias</span>
          </p>
        </div>

        <div className="flex gap-5 items-center">
          {/* hago esto con el boton por la ref que se le está pasando */}
          <EditButton dispatch={dispatch} activity={activity} />

          <button
            //con el onclick se llama la action throght el dispatch y se pasa el payload (la info)
            aria-label="delete button"
            onClick={() =>
              dispatch({
                type: "delete-activity",
                payload: { id: activity.id },
              })
            }
          >
            <XCircleIcon className="h-8 w-8 text-red-500" />
          </button>
        </div>
      </div>
    </Reorder.Item>
  );
};

export default Item;
