import { Menu } from 'antd'
import { Header } from 'antd/es/layout/layout'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../store';
import { isLoggedIn } from '../store/actions/userActions';
import { AppDispatch } from '../store/store';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { showError } from '../utils/showMessage';

function AppHeader() {


    const dispatch: AppDispatch = useDispatch();
    const { data, loading, error,loginError } = useSelector((state: AppState) => state.user)

    const token = localStorage.getItem('token');


    useEffect(() => {
        dispatch(isLoggedIn(token))
    }, [])

    const navigate = useNavigate();
    const { pathname } = useLocation();
    console.log(pathname)

    useEffect(() => {
        if (pathname !== "/" && pathname !== "/register" && (!token || loginError)) {
            navigate('/login'); // Token yoksa login sayfasına yönlendir
        }
    }, [token, navigate]);


    useEffect(() => {
        loginError && pathname !== "/login" && pathname !== "/" && showError(loginError)
    }, [loginError])


    console.log(data)

    return (
        <Header
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 1,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <div className="demo-logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[pathname]}
                style={{ flex: 1, minWidth: 0 }}>
                    
                <Menu.Item key="/"><Link to="/">Home</Link></Menu.Item>


                {
                    data.username && token ? <>
                        <Menu.Item key="/categories" ><Link to="/categories">Categories</Link></Menu.Item>
                        <Menu.Item key="/records"><Link to="/records">Records</Link></Menu.Item>
                        <Menu.Item key="/logout"><Link to="/logout">Logout</Link></Menu.Item></> : loading ? null :

                       <>
                        <Menu.Item key="/login"><Link to="/login">Login</Link></Menu.Item>
                        <Menu.Item key="/register"><Link to="/register">Register</Link></Menu.Item></>
                }






            </Menu>
        </Header>
    )
}

export default AppHeader