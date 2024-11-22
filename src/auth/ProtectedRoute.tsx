
import { Navigate } from 'react-router-dom';


type ProtectedRouteProps = {
  children: JSX.Element;
  allowedRoles: string[];
};

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const role = sessionStorage.getItem('role');
  if (!sessionStorage.getItem('role') || !allowedRoles.includes(role!)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
