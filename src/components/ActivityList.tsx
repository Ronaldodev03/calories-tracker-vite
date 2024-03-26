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
};

//component
export default function ActivityList({
  activities,
  dispatch,
}: ActivityListProps) {
  const [activitiesDnD, setActivitiesDnD] = useState(activities);

  const [items, setItems] = useState([
    {
      id: 1,
      body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto, adipisci!",
    },
    {
      id: 2,
      body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto, adipisci!",
    },
    {
      id: 3,
      body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto, adipisci!",
    },
    {
      id: 4,
      body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto, adipisci!",
    },
    {
      id: 5,
      body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto, adipisci!",
    },
  ]);

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
    /* dispatch({
      type: "save-order",
      payload: { newOrder: activitiesDnD },
    }); */
  };

  //updating UI when activities changes
  useEffect(() => {
    /* esto soluciona el problema de la distorsion de la UI en mobile*/
    //setActivitiesDnD(activities);
  }, [activities]);

  return (
    <>
      <h2 className=" text-3xl sm:text-4xl font-bold text-slate-600 text-center">
        Comida y Actividades
      </h2>

      {isEmptyActivities ? (
        <p className="text-center my-5">No hay actividades aún...</p>
      ) : (
        <Reorder.Group values={items} onReorder={setItems}>
          {items.map((item) => (
            <Reorder.Item
              key={item.id}
              value={item}
              className=" bg-blue-400 px-2 py-4 text-3xl font-bold text-center relative"
            >
              {item.body}

              <div className=" absolute bg-lime-300 -top-4 -left-8 w-20 h-10"></div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      )}
    </>
  );
}
