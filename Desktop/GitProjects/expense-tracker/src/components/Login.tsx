

import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, Result, Typography } from 'antd';

import api from '../utils/api';
import { useLocation, useNavigate } from 'react-router-dom';
import { showError, showSuccess } from '../utils/showMessage';
import Title from 'antd/es/typography/Title';
import { LoginForm, UserDispatch } from '../types/user';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/actions/userActions';
import { AppState } from '../store';
import { useEffect, useState } from 'react';
import { AppDispatch } from '../store/store';
const { Text } = Typography;


function Login() {

    const [isLoginSuccess, setLoginSuccess] = useState(false);

    const token =localStorage.getItem("token");
    const navigate = useNavigate();

    const dispatch: AppDispatch = useDispatch();

    const { data, loading, error,loginError } = useSelector((state: AppState) => state.user)
    const location = useLocation();

    type FieldType = {
        username?: string;
        password?: string;
        remember?: string;
    };

    const onFinish = async(values: LoginForm) => {
      await  dispatch(login(values));
      showSuccess("You have successfully logged in!");
      navigate("/")

    }

    useEffect(() => {
        error && showError(error)
    }, [error])

  

    // useEffect(() => {
    //     // Show success message only once after successful login
    //     if (data.username && !isLoginSuccess) {
    //         showSuccess("You have successfully logged in!");
    //         setLoginSuccess(true); // Prevent further triggers
    //     }
    // }, [data.username, isLoginSuccess]);

      useEffect(() => {
        
        if (token && !isLoginSuccess) {
            setLoginSuccess(true);
          navigate("/"); // Ensure no infinite redirects
        }
    }, [token, navigate]);

    // const onFinish: FormProps<FieldType>['onFinish'] = async(values) => {
    //     try {
    //         await api.post("/users/login",values);
    //         console.log('Success:', values);
    //         navigate("/");
    //         showSuccess("Login successfull");
    //     } catch (error) {
    //         showError("An error occured: " + (error as any).response.data.error);

    //     }
    //   };



    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
        >


            {location.state?.newSignUp &&
                (

                    <Result
                        status="success"
                        title="You successfully signed up.!"
                        subTitle="Please login using your credentials"

                    />)
            }

            <Title level={2}>Login</Title>

            <Form.Item<FieldType>
                style={{ marginTop: 30 }}
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>
            {/* 
    <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
      <Checkbox>Remember me</Checkbox>
    </Form.Item> */}

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default Login