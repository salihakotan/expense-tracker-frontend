import { Button, Form, Input, InputNumber, Checkbox,message, Space } from 'antd';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import Title from 'antd/es/typography/Title';



const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};


const showError = (errorMessage:string) => {
 message.error(errorMessage);
};

const showSuccess = (successMessage:String) => {
  message.success(successMessage);
};


function SignUp() {

  const navigate = useNavigate();


  const onFinish = async (values: any) => {
    try {
      await api.post("/users/register", values);
      showSuccess("Registered successfully")
      navigate("/login");
    } catch (error) {
      console.log(error);
      showError((error as any).response.data.error);
    }
  };

  
  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      validateMessages={validateMessages}
    >
  <Title level={2} style={{marginBottom:40}}>Register for an account</Title>
      <Form.Item name="full_name" label="Full name" rules={[{ type: 'string', min: 3, max: 99 }]}>
        <Input />
      </Form.Item>


      <Form.Item name="username" label="Username" rules={[{ required: true }]}>
        <Input />
      </Form.Item>



      <Form.Item name="email" label="Email" rules={[{ type: 'email' }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!', min: 6 }]}
      >
        <Input.Password />
      </Form.Item>



      <Form.Item name="remember" valuePropName="checked" label={null}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>


      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default SignUp