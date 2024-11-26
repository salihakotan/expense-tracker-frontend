import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../store";

export interface Category{
    id:number,
    name:string,
    type:"expense" | "income",
    color:string
}


export interface CategoryState {
    data:Category[];
    loading:boolean;
    error:string
}

 interface GET_START{
    type:"GET_CATEGORIES_START"
}
 interface GET_SUCCESS{
    type:"GET_CATEGORIES_SUCCESS",
    payload:Category[]
}

 interface GET_ERROR{
    type:"GET_CATEGORIES_ERROR"
}



interface ADD_START{
    type:"ADD_CATEGORIES_START"
}
 interface ADD_SUCCESS{
    type:"ADD_CATEGORIES_SUCCESS",
    payload:Category
}

 interface ADD_ERROR{
    type:"ADD_CATEGORIES_ERROR"
}



interface UPDATE_START{
    type:"UPDATE_CATEGORIES_START"
}
 interface UPDATE_SUCCESS{
    type:"UPDATE_CATEGORIES_SUCCESS",
    payload:Category
}

 interface UPDATE_ERROR{
    type:"UPDATE_CATEGORIES_ERROR"
}


interface DELETE_START{
    type:"DELETE_CATEGORIES_START"
}
 interface DELETE_SUCCESS{
    type:"DELETE_CATEGORIES_SUCCESS",
    payload:number
}

 interface DELETE_ERROR{
    type:"DELETE_CATEGORIES_ERROR"
}

export type CategoryTypeAction =  GET_START | GET_ERROR | GET_SUCCESS | ADD_START | ADD_ERROR | ADD_SUCCESS |  
UPDATE_START | UPDATE_ERROR | UPDATE_SUCCESS
| DELETE_START | DELETE_ERROR | DELETE_SUCCESS;
export type AppCategoryAction = CategoryTypeAction;

// export type CategoryTypeDispatch = ThunkDispatch<CategoryTypeState,void, CategoryTypeAction >;
export type CategoryTypeDispatch = ThunkDispatch<AppState, void, AppCategoryAction>;
