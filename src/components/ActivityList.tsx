/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, Dispatch, useState, useEffect } from "react";
import { Activity } from "../types";
import { categories } from "../data/categories";
import { ActivityActions } from "../reducers/activity-reducer";
import { Reorder } from "framer-motion";
import Item from "./Item";

//props del componente
type ActivityListProps = {
  activities: Activity[];
  dispatch: Dispatch<ActivityActions>;
  goToFormSection: () => void;
};

//component
export default function ActivityList({
  activities,
  dispatch,
  goToFormSection,
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
            <Item
              key={activity.id}
              activity={activity}
              saveOrder={saveOrder}
              categoryName={categoryName}
              dispatch={dispatch}
              goToFormSection={goToFormSection}
            />
          ))}
        </Reorder.Group>
      )}
    </>
  );
}
