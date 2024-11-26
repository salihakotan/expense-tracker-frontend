import { createStore, applyMiddleware } from "redux";
import { ThunkMiddleware,thunk } from "redux-thunk";
import rootReducer, { AppState } from ".";
import { AppUserAction } from "../types/user";
import { AppCategoryAction } from "../types/category";
import { AppRecordAction } from "../types/record";

const store = createStore(
    rootReducer,
    applyMiddleware(thunk as ThunkMiddleware<AppState, AppUserAction |AppCategoryAction | AppRecordAction >)
);

export type AppDispatch = typeof store.dispatch;
export default store;
