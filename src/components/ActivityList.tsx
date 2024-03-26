/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, Dispatch, useState, useEffect } from "react";
import { Activity } from "../types";
import { categories } from "../data/categories";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { ActivityActions } from "../reducers/activity-reducer";
import EditButton from "./EditButton";
import { Reorder } from "framer-motion";

//props del componente
type ActivityListProps = {
  activities: Activity[];
  dispatch: Dispatch<ActivityActions>;
};

//component
export default function ActivityList({
  activities,
  dispatch,
}: ActivityListProps) {
  const [activitiesDnD, setActivitiesDnD] = useState(activities);

  //function para llevar los numeros de la categoria (comida o ejercicio) al texto "comida" o "ejercicio", ya que sus valores son 1 o 2.
  const categoryName = useMemo(
    () => (category: Activity["category"]) =>
      categories.map((cat) => (cat.id === category ? cat.name : "")),
    [activities] //cada ves que las actividades cambian se trigerea esta funcion
  );

  //function para saber si hay actividades o no
  const isEmptyActivities = useMemo(
    () => activities.length === 0,
    [activities] //cada ves que las actividades cambian se trigerea esta funcion
  );

  //salvar el orden del DnD
  const saveOrder = () => {
    dispatch({
      type: "save-order",
      payload: { newOrder: activitiesDnD },
    });
  };

  //updating UI when activities changes
  useEffect(() => {
    setActivitiesDnD(activities);
  }, [activities]);

  return (
    <>
      <h2 className=" text-3xl sm:text-4xl font-bold text-slate-600 text-center">
        Comida y Actividades
      </h2>

      {isEmptyActivities ? (
        <p className="text-center my-5">No hay actividades aún...</p>
      ) : (
        <Reorder.Group values={activitiesDnD} onReorder={setActivitiesDnD}>
          {activitiesDnD.map((activity) => (
            <Reorder.Item
              key={activity.id}
              value={activity}
              onDragEnd={saveOrder} // para el reducer (o la DB si hay)
            >
              <div className="px-5 py-10 bg-white mt-5 flex justify-between shadow">
                <div className="space-y-2 relative">
                  <p
                    className={` absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold 
                            ${
                              activity.category === 1
                                ? "bg-[#FF0000]"
                                : "bg-lime-500"
                            }`}
                  >
                    {categoryName(+activity.category)}
                  </p>

                  <p className="text-2xl font-bold capitalize">
                    {activity.name}
                  </p>
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
          ))}
        </Reorder.Group>
      )}
    </>
  );
}
