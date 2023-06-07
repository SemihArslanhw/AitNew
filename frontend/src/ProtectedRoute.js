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
        alert("Lütfen Giriş Yapınız")
        return <Navigate to={redirectLoginPath} />;
    }

    if (permissions && !permissions.includes(user.role)) {
        alert(" Yetkiniz " + user + " Yetkiniz Bulunmamaktadır Girebilmeniz İçin Yetkili Bir Kişiye Başvurunuz")
        return <Navigate to={redirectPath} />;
    }

    return children;
  };

    export default ProtectedRoute;
