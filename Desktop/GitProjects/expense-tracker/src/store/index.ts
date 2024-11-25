import { combineReducers } from "redux"
import userReducer from "./reducers/userReducer";
import { UserState } from "../types/user";

interface AppState{
    user:any //userstate
    // categories:any,
    // records:any
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
    user: userReducer
    // records: recordsReducer, 
    // categories: categoriesReducer, 
})


export default rootReducer;