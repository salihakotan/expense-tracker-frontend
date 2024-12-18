import { LoginForm, User, UserDispatch } from "../../types/user";
import api from "../../utils/api";

import { showSuccess } from "../../utils/showMessage";

export const login =  (creds:LoginForm) => async (dispatch:UserDispatch)=> {
   
   dispatch({type:"LOGIN_START"});
   try {
    const response = await api().post<User>("/users/login",creds);
    dispatch({type:"LOGIN_SUCCESS",payload:response.data})
    localStorage.setItem("token",response.data.token);
   } catch (error) {
    dispatch({type:"LOGIN_ERROR"});
    localStorage.removeItem("token");
   }
}

export const isLoggedIn =  (token:string | null) => async (dispatch:UserDispatch)=> {
   

   dispatch({type:"IS_LOGGED_IN_START"});
   try {
    const response = await api().post<User>("/users/is_logged_in",{token});
    dispatch({type:"IS_LOGGED_IN_SUCCESS",payload:response.data})
   } catch (error) {
    dispatch({type:"IS_LOGGED_IN_ERROR"});
    localStorage.removeItem("token");
   }
}

export const logout = () => (dispatch:UserDispatch) => {
   localStorage.removeItem("token")
   dispatch({type:"LOGOUT"})
}