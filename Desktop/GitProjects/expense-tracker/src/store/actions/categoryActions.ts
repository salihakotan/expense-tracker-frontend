import React from 'react'
import { Category, CategoryTypeDispatch } from '../../types/category';
import api from '../../utils/api';
import { CategoryForm } from '../../components/Categories';


export const getCategories = () => async (dispatch : CategoryTypeDispatch) => {
    dispatch({type:"GET_CATEGORIES_START"});
    try {
       const response = await api.get<Category[]>("/categories");
       dispatch({type:"GET_CATEGORIES_SUCCESS",payload:response.data});
       console.log(response);
    } catch (error) {
        dispatch({type:"GET_CATEGORIES_ERROR"});
    }
    
}

export const addCategory = (form:CategoryForm) => async (dispatch:CategoryTypeDispatch) => {
    dispatch({type:"ADD_CATEGORIES_START"});
    try {
        const response = await api.post<Category>("/categories",form)
        dispatch({type:"ADD_CATEGORIES_SUCCESS",payload:response.data});
    } catch (error) {
        dispatch({type:"ADD_CATEGORIES_ERROR"})
    }
}


export const updateCategory = (form:Partial<CategoryForm>,categoryId:number) => async (dispatch:CategoryTypeDispatch) => {
    dispatch({type:"UPDATE_CATEGORIES_START"});
    try {
        const response = await api.put<Category>("/categories/" + categoryId,form)
        dispatch({type:"UPDATE_CATEGORIES_SUCCESS",payload:response.data});
    } catch (error) {
        dispatch({type:"UPDATE_CATEGORIES_ERROR"})
    }
}

export const deleteCategory = (categoryId:number) => async (dispatch:CategoryTypeDispatch) => {
    dispatch({type:"DELETE_CATEGORIES_START"});
    try {
        await api.delete("/categories/" + categoryId)
        dispatch({type:"DELETE_CATEGORIES_SUCCESS",payload:categoryId});
    } catch (error) {
        dispatch({type:"DELETE_CATEGORIES_ERROR"})
    }
}
