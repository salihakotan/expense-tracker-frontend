import { Record, RecordDispatch, RecordForm } from "../../types/record";
import api from "../../utils/api";

export const getRecords = () => async (dispatch:RecordDispatch) => {

    dispatch({type:"GET_RECORDS_START"});
    try {
        const response = await api.get<Record[]>("/records")
        dispatch({type:"GET_RECORDS_SUCCESS",payload:response.data})
    } catch (error) {
        dispatch({type:"GET_RECORDS_ERROR"});
    }

}


export const addRecord = (form:RecordForm) => async (dispatch:RecordDispatch) => {
    dispatch({type:"ADD_RECORDS_START"});
    try {
        const response = await api.post<Record>("/records",form)
        dispatch({type:"ADD_RECORDS_SUCCESS",payload:response.data});
    } catch (error) {
        dispatch({type:"ADD_RECORDS_ERROR"})
    }
}


export const updateRecord = (form:Partial<RecordForm>,id:Record['id']) => async (dispatch:RecordDispatch) => {
    dispatch({type:"UPDATE_RECORDS_START"});
    try {
        const response = await api.put<Record>("/records/" + id,form)
        dispatch({type:"UPDATE_RECORDS_SUCCESS",payload:response.data});
    } catch (error) {
        dispatch({type:"UPDATE_RECORDS_ERROR"})
    }
}

export const deleteRecord = (id:Record['id']) => async (dispatch:RecordDispatch) => {
    dispatch({type:"DELETE_RECORDS_START"});
    try {
        await api.delete("/records/" + id)
        dispatch({type:"DELETE_RECORDS_SUCCESS",payload:id});
    } catch (error) {
        dispatch({type:"DELETE_RECORDS_ERROR"})
    }
}