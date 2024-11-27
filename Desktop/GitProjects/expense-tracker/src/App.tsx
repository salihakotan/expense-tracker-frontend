import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./components/Home";
import Categories from "./components/Categories";
import Records from "./components/Records";
import AppHeader from "./components/AppHeader";
import Logout from "./components/Logout";
import BudgetData from "./components/Charts/BudgetData";
import PieChartTest from "./components/Charts/PieChartTest";

const { Header, Content, Footer } = Layout;


function App() {

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const isAuthenticated = !!localStorage.getItem("token"); // Check token existence


  return (
    <>

      <Layout>
      <AppHeader/>
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
              <Route path="/logout" element={<Logout />} />

              <Route path="/categories" element={<Categories />}/>
              <Route path="/records" element={<Records />} />

              {/* CHARTS */}
              <Route path="/budgetData" element={<BudgetData />} />
              <Route path="/pieChartTest" element={<PieChartTest />} />

             <Route path="/" element={<Home />} />
             
             
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
