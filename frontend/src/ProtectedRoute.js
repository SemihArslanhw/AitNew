import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
    user = localStorage.getItem('user'),
    redirectLoginPath = '/login',
    redirectPath = '/home',
    permissions ,
    children,
  }) => {
    user = JSON.parse(user);

    if (!user) {
        alert("Please Login First")
        return <Navigate to={redirectLoginPath} />;
    }

    if (permissions && !permissions.includes(user.role)) {
        alert("You don't have permission to access this page , please contact with admin")
        return <Navigate to={redirectPath} />;
    }

    return children;
  };

    export default ProtectedRoute;
