import React, { useEffect } from 'react'
import { AppDispatch } from '../store/store'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/actions/userActions';
import { AppState } from '../store';
import { useNavigate } from 'react-router-dom';

function Logout() {


    const dispatch:AppDispatch = useDispatch();
    const navigate = useNavigate();

    const {data} = useSelector((state:AppState) => state.user)

    useEffect(()=> {
        dispatch(logout())
    },[])


    if(!data.username) {
        navigate("/login")
    }
  

  return (
    <div>Logging out...</div>
  )
}

export default Logout