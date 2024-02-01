import { combineReducers, legacy_createStore as createStore } from "redux";
import { tasksReducer } from "./tasks-reducer";
import { todolistsReducer } from "./todolists-reducer";
import { TaskStateType, TodoListType } from "../AppWithRedux";

export const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
});

export type AppRootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer); // Redux Toolkit configureStore??

//@ts-ignore
window.store = store;
