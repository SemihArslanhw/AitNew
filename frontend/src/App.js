import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './Pages/Auth/Login/LoginPage';
import SearchPage from './Pages/Search/Search';
import LeftBar from './Components/LeftBar/LeftBar';
import Header from './Components/Header/Header';
import UserManagement from './Pages/Admin/UserManagement/UserManagement';
import NotFound from './Pages/NotFound';
import { Helmet } from 'react-helmet';
import LeftBarUserManagement from './Components/LeftBar/LeftBarUserManagement';
import HomePage from './Pages/Home/HomePage';
import FileManagement from './Pages/Admin/FileManagement/FileManagement';

function App() {
  return (
    <div className='h-full w-full'>
      <Helmet>
          <title>Archivist</title>
        </Helmet>
        
        
    <Routes>
        
          <Route path="/home" element={<LeftBar><Header/><SearchPage/></LeftBar>} />
          <Route path="/" element={<LeftBarUserManagement><Header/><HomePage/></LeftBarUserManagement>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='*' element={<LeftBarUserManagement><Header/><NotFound/></LeftBarUserManagement>} />
          <Route path="/usermanagement" element={<LeftBarUserManagement><Header/><UserManagement/></LeftBarUserManagement>} />
          <Route path="/filemanagement" element={<LeftBarUserManagement><Header/><FileManagement/></LeftBarUserManagement>} />
          {/* <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
          <Route path="/resetpassword/:resetToken" element={<ResetPasswordPage />} /> */}
          
          {/* <Route
            path="/protected"
            element={
              <RequireAuth>
                <ProtectedPage />
              </RequireAuth>
            }
          /> */}
        
      </Routes>
      </div>
  );
}

export default App;
