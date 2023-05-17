import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './Pages/Auth/Login/LoginPage';
import HomePage from './Pages/Home/HomePage';
import LeftBar from './Components/LeftBar/LeftBar';
import Header from './Components/Header/Header';
import UserManagement from './Pages/UserManagement/UserManagement';
import NotFound from './Pages/NotFound';
import { Helmet } from 'react-helmet';


function App() {
  return (
    <div className='h-full w-full'>
      <Helmet>
          <title>Archivist</title>
        </Helmet>
        
        
    <Routes>
        
          <Route path="/" element={<LeftBar><Header/><HomePage/></LeftBar>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='*' element={<LeftBar><Header/><NotFound/></LeftBar>} />
          <Route path="/usermanagement" element={<LeftBar><Header/><UserManagement/></LeftBar>} />
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
