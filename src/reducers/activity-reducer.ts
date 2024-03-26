import { Activity } from "../types";

//actions and ts type
export type ActivityActions =
  | { type: "save-activity"; payload: { newActivity: Activity } } //para salvar actividad nueva
  | { type: "set-activeId"; payload: { id: Activity["id"] } } //para editar
  | { type: "delete-activity"; payload: { id: Activity["id"] } } //para borrar
  | { type: "save-order"; payload: { newOrder: Activity[] } } //salvar el orden del DnD
  | { type: "restart-app" }; //reset

//type de ts para el initialState
export type ActivityState = {
  activities: Activity[];
  activeId: Activity["id"];
};

//defaultActivities
const defaultActivities: Activity[] = [
  {
    id: "1",
    category: 2,
    name: "Correr",
    calories: 300,
  },
  {
    id: "2",
    category: 2,
    name: "Gym",
    calories: 600,
  },
  {
    id: "3",
    category: 1,
    name: "Hot dogs",
    calories: 400,
  },
  {
    id: "4",
    category: 1,
    name: "Pizza",
    calories: 600,
  },
];

//para retornar lo que este (si es que hay) en LS
const localStorageActivities = (): Activity[] => {
  const activities = localStorage.getItem("activities");
  return activities ? JSON.parse(activities) : defaultActivities;
};

//state inicial
export const initialState: ActivityState = {
  activities: localStorageActivities(), //el initialState vendrá de LS
  activeId: "", // si se quiere editar entonces este id pasa a ser el id de la actividad a editar
};

//reducer
export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
) => {
  //salvar al evitar o crear
  if (action.type === "save-activity") {
    let updatedActivities: Activity[] = [];
    //si entra en este if entonces es para editar y no para crear una actividad nueva
    if (state.activeId) {
      updatedActivities = state.activities.map((activity) =>
        activity.id === state.activeId ? action.payload.newActivity : activity
      );
      //si entra en el else entonces es para crear una actividad nueva
    } else {
      updatedActivities = [...state.activities, action.payload.newActivity]; // actualizo las actividades
    }

    // se retorna el estado actualizado
    return {
      ...state, //copia del state
      activities: updatedActivities, //se actualizan las actividades
      activeId: "", //se resetea el id que es para editar
    };
  }

  //setea un id para editar
  if (action.type === "set-activeId") {
    // se retorna el estado actualizado
    return {
      ...state,
      activeId: action.payload.id,
    };
  }

  //borrar
  if (action.type === "delete-activity") {
    // se retorna el estado actualizado
    return {
      ...state,
      activities: state.activities.filter(
        (activity) => activity.id !== action.payload.id
      ),
    };
  }

  //save new order
  if (action.type === "save-order") {
    return {
      ...state,
      activities: action.payload.newOrder,
    };
  }

  //reset app
  if (action.type === "restart-app") {
    // se retorna el estado actualizado
    return {
      activities: [],
      activeId: "",
    };
  }

  return state; //siempre retorna el state
};
