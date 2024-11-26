import { combineReducers } from "redux"
import userReducer from "./reducers/userReducer";
import { UserState } from "../types/user";
import { CategoryState } from "../types/category";
import categoryReducer from "./reducers/categoryReducer";
import { RecordState } from "../types/record";
import recordsReducer from "./reducers/recordsReducer";

export interface AppState{
    user:UserState,
     categories:CategoryState,
     records:RecordState
}


// const recordsReducer = (state = {}, action: any) => {
//     // Kaydın reducer'ı buraya eklenecek
//     return state;
//   };
  
//   const categoriesReducer = (state = {}, action: any) => {
//     // Kategorilerin reducer'ı buraya eklenecek
//     return state;
//   };

 const rootReducer = combineReducers<AppState>({
    user: userReducer as any,  // fix error !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    categories: categoryReducer as any,
    records: recordsReducer as any, 
})



export default rootReducer;