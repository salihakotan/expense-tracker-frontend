import { Route, Navigate, Routes } from 'react-router-dom';

interface PrivateRouteProps {
  component: React.FC<any>;
  isAuthenticated: boolean;
  path: string;
}

function PrivateRoute({ component: Component, isAuthenticated, path }: PrivateRouteProps) {
  return (
    <Routes>
    <Route
      path={path}
      element={isAuthenticated ? <Component /> : <Navigate to="/login" />}
    /></Routes>
  );
}

export default PrivateRoute;
