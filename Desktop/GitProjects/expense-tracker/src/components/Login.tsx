

import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input,Typography } from 'antd';

import api from '../utils/api';
import {  useLocation, useNavigate } from 'react-router-dom';
import { showError, showSuccess } from '../utils/showMessage';
import Title from 'antd/es/typography/Title';
const { Text } = Typography;


function Login() {


    const navigate = useNavigate();

    const location = useLocation();
    console.log(location);

    type FieldType = {
        username?: string;
        password?: string;
        remember?: string;
      };
      
    const onFinish: FormProps<FieldType>['onFinish'] = async(values) => {
        try {
            await api.post("/users/login",values);
            console.log('Success:', values);
            navigate("/");
            showSuccess("Login successfull");
        } catch (error) {
            showError("An error occured: " + (error as any).response.data.error);

        }
       

      };
      
      const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
        showError("An error occured");
      };

  return (
    <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
      <Title level={2}>Login</Title>

        {location.state?.newSignUp &&
           ( <Text type="success">You successfully signed up. Please login using your credentials</Text>)
        }

    <Form.Item<FieldType>
        style={{marginTop:30}}
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