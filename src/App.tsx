/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { useReducer, useEffect, useMemo, useRef } from "react";
import Form from "./components/Form";
import { activityReducer, initialState } from "./reducers/activity-reducer";
import ActivityList from "./components/ActivityList";
import CalorieTracker from "./components/CalorieTracker";
import { CiSearch } from "react-icons/ci";
import { FaArrowCircleUp } from "react-icons/fa";

function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState); // instanciamos el reducer en el App.tsx; useReducer toma 2 parametros, el reducer y el initialState

  const ref = useRef<HTMLHeadingElement>(null);

  //save en LS cada vez que cambien las actidivades (que se añada/borre una)
  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state.activities));
  }, [state.activities]);

  //retorna un boole para que este disable o no el boton de reset
  const canRestartApp = () =>
    useMemo(() => state.activities.length, [state.activities]);

  // función para desplazarse a la sección referenciada
  const goToFormSection = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header className="bg-blue-600 py-3 px-5 " ref={ref}>
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className=" flex gap-2 items-center">
            <CiSearch size={30} color="white" />
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
        <ActivityList
          goToFormSection={goToFormSection}
          activities={state.activities}
          dispatch={dispatch}
        />
      </section>
      <div
        className="my-5 sm:my-10 max-w-max mx-auto cursor-pointer hover:scale-125 transition-all"
        onClick={goToFormSection}
      >
        <FaArrowCircleUp size={50} className=" text-blue-500" />
      </div>

      <p className=" select-none pb-5 sm:pb-10 text-center text-slate-500">
        Drag and drop to reorder list
      </p>
    </>
  );
}

export default App;
