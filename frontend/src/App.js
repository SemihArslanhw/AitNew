import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './Pages/Auth/Login/LoginPage';
import SearchPage from './Pages/Search/Search';
import LeftBar from './Components/LeftBar/LeftBar';
import Header from './Components/Header/Header';
import UserManagement from './Pages/UserManagement/UserManagement';
import NotFound from './Pages/NotFound';
import { Helmet } from 'react-helmet';
import LeftBarFirst from './Components/LeftBar/LeftBarFirst';
import HomePage from './Pages/Home/HomePage';
import FileManagement from './Pages/Admin/FileManagement';

function App() {
  return (
    <div className='h-full w-full'>
      <Helmet>
          <title>Archivist</title>
        </Helmet>
        
        
    <Routes>
        
          <Route path="/home" element={<LeftBar><Header/><SearchPage/></LeftBar>} />
          <Route path="/" element={<LeftBarFirst><Header/><HomePage/></LeftBarFirst>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='*' element={<LeftBarFirst><Header/><NotFound/></LeftBarFirst>} />
          <Route path="/usermanagement" element={<LeftBarFirst><Header/><UserManagement/></LeftBarFirst>} />
          <Route path="/filemanagement" element={<LeftBarFirst><Header/><FileManagement/></LeftBarFirst>} />
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
