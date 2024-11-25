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

