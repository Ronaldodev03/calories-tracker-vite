/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { useReducer, useEffect, useMemo } from "react";
import Form from "./components/Form";
import { activityReducer, initialState } from "./reducers/activity-reducer";
import ActivityList from "./components/ActivityList";
import CalorieTracker from "./components/CalorieTracker";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState); // instanciamos el reducer en el App.tsx; useReducer toma 2 parametros, el reducer y el initialState

  //save en LS cada vez que cambien las actidivades (que se añada/borre una)
  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state.activities));
  }, [state.activities]);

  //retorna un boole para que este disable o no el boton de reset
  const canRestartApp = () =>
    useMemo(() => state.activities.length, [state.activities]);

  return (
    <>
      <header className="bg-blue-600 py-3 px-5">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className=" flex gap-2 items-center">
            <MagnifyingGlassIcon className="h-6 w-6 text-white" />
            <h1 className="text-center text-lg font-bold text-white">
              Calories-Tracker
            </h1>
          </div>

          <button
            className="bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:opacity-10"
            disabled={!canRestartApp()}
            // onclick que activa la funcion de reset throght el dispatch
            onClick={() => dispatch({ type: "restart-app" })}
          >
            Reiniciar App
          </button>
        </div>
      </header>

      <section className="bg-blue-500 py-10 sm:py-20 px-5">
        <div className="max-w-4xl mx-auto ">
          <Form dispatch={dispatch} state={state} />
        </div>
      </section>

      <section className="bg-gray-800 py-10">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker activities={state.activities} />
        </div>
      </section>

      <section className="p-5 sm:p-10 mx-auto max-w-4xl ">
        <ActivityList activities={state.activities} dispatch={dispatch} />
      </section>
    </>
  );
}

export default App;
