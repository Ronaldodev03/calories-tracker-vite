/* eslint-disable react-hooks/exhaustive-deps */
import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { categories } from "../data/categories";
import type { Activity } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activity-reducer";

//type para las props de este component, nos estamos trayendo el state y el dispatch throght props
type FormProps = {
  dispatch: Dispatch<ActivityActions>;
  state: ActivityState;
};

// initial state es type Activity
const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  name: "",
  calories: 0,
};

export default function Form({ dispatch, state }: FormProps) {
  const [activity, setActivity] = useState<Activity>(initialState); //acá se usa generics para el initial state del hook

  // detecta cada vez que se le da al boton de editar y llena el formulario
  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.filter(
        (stateActivity) => stateActivity.id === state.activeId
      )[0];
      setActivity(selectedActivity);
    }
  }, [state.activeId]);

  //handleChange para las inputs de la form
  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement> // el type del evento, puede ser de select o de input
  ) => {
    const isNumberField = ["category", "calories"].includes(e.target.id); //esto es para llevar a numero la categoria o las calorias, y que no queden como string en el state.

    setActivity({
      ...activity, // copia del estate y en la siguiente linea cambio lo que haga cambiado en el onChange
      [e.target.id]:
        isNumberField && +e.target.value !== 0 // +e.target.value !== 0 --> sin esto no se puede ver el placeholder, el problema es que cuando se vea el placeholder el campo "calories" será un string momentaneamente en lugar de un number, pero la UX será mejor, por eso lo dejo
          ? +e.target.value
          : e.target.value, // el + al frente convierte el string a number
    });
  };

  //para disable el input de submit si las inputs no son apropiadas
  const isValidActivity = () => {
    const { name, calories } = activity;
    return name.trim() !== "" && calories > 0;
  };

  //submit de la form
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // este dispatch actualiza el state
    dispatch({ type: "save-activity", payload: { newActivity: activity } }); // activo la action a traves del dispatch y mando el payload, el payload es la info, activity en este caso, y en el reducer se leerá como newActivity

    //reseteo el state y le coloco un nuevo id
    setActivity({
      ...initialState,
      id: uuidv4(),
    });
  };

  return (
    <form
      className="space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">
          Categoría:
        </label>
        <select
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          id="category"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">
          Actividad:
        </label>
        <input
          id="name"
          type="text"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
          value={activity.name}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calorias:
        </label>
        <input
          id="calories"
          type="number"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Calorias. ej. 300 o 500"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
        value={activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"}
        disabled={!isValidActivity()}
      />
    </form>
  );
}
