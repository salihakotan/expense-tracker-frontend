import { ThunkDispatch } from "redux-thunk";
import { Category } from "./category";
import { AppState } from "../store";

export interface Record{
    id:number,
    title:string,
    amount:number,
    category:Category,
    category_id:number
}

export interface RecordForm {
    title: string,
    amount:number,
    category_id:number
}

export interface RecordState{
    data:Record[],
    loading:boolean,
    error:string
}

interface GET_SUCCESS {
    type:"GET_RECORDS_SUCCESS",
    payload:Record[]
}
interface GET_START {
    type:"GET_RECORDS_START"
}

interface GET_ERROR {
    type:"GET_RECORDS_ERROR"
}


interface ADD_SUCCESS {
    type:"ADD_RECORDS_SUCCESS",
    payload:Record
}
interface ADD_START {
    type:"ADD_RECORDS_START"
}

interface ADD_ERROR {
    type:"ADD_RECORDS_ERROR"
}



interface UPDATE_START{
    type:"UPDATE_RECORDS_START"
}
 interface UPDATE_SUCCESS{
    type:"UPDATE_RECORDS_SUCCESS",
    payload:Record
}

 interface UPDATE_ERROR{
    type:"UPDATE_RECORDS_ERROR"
}


interface DELETE_START{
    type:"DELETE_RECORDS_START"
}
 interface DELETE_SUCCESS{
    type:"DELETE_RECORDS_SUCCESS",
    payload:number
}

 interface DELETE_ERROR{
    type:"DELETE_RECORDS_ERROR"
}

export type RecordAction = GET_START | GET_ERROR | GET_SUCCESS | ADD_START | ADD_ERROR | ADD_SUCCESS
| UPDATE_START | UPDATE_ERROR | UPDATE_SUCCESS
| DELETE_START | DELETE_ERROR | DELETE_SUCCESS;;
export type AppRecordAction = RecordAction;

export type RecordDispatch = ThunkDispatch<AppState,void, AppRecordAction>;