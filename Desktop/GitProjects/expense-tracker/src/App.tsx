import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./components/Home";
import Main from "./components/Main";
import Categories from "./components/Categories";

const { Header, Content, Footer } = Layout;

const items = new Array(3).fill(null).map((_, index) => ({
  key: String(index + 1),
  label: `nav ${index + 1}`,
}));

function App() {

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const isAuthenticated = !!localStorage.getItem("token"); // Check token existence


  return (
    <>

      <Layout>
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
            defaultSelectedKeys={['2']}
            items={items}
            style={{ flex: 1, minWidth: 0 }}
          />
        </Header>
        <Content style={{ padding: '20px 48px' }}>

          <div
            style={{
              padding: 24,
              minHeight: 380,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
          
              <Route path="/register" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<PrivateRoute isAuthenticated={isAuthenticated} component={Home} path="/" />} />
              <Route path="/categories" element={<PrivateRoute isAuthenticated={isAuthenticated} component={Categories} path="/" />}/>

             <Route path="/" element={<Main />} />
             


             
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Budget Tracker ©{new Date().getFullYear()} Created by S
        </Footer>
      </Layout>



    </>
  );
}

export default App;
