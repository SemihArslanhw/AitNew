import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
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
import HeaderAdmin from './Components/Header/HeaderAdmin';
import { useEffect, useState } from 'react';
import ProtectedRoute from './ProtectedRoute';

function App() {


  return (
    <div className='h-full w-full'>
      <Helmet>
        <title>Archivist</title>
      </Helmet>


      <Routes>

        <Route path="/home"
          element={
            <ProtectedRoute permissions={["Developer" , "User" , "Admin"]}>
              <LeftBar><Header /><SearchPage /></LeftBar>
            </ProtectedRoute>
          } />
        <Route path="/" element={
          <ProtectedRoute permissions={["Developer" , "User" , "Admin"]}>
            <LeftBarUserManagement><Header /><HomePage /></LeftBarUserManagement>
          </ProtectedRoute>
        } />
        <Route path="/login" element={<LoginPage />} />
        <Route path='*' element={<NotFound />} />
        <Route path="/usermanagement"
          element={
            <ProtectedRoute permissions={["Developer" , "Admin"]}>
              <LeftBarUserManagement><HeaderAdmin /><UserManagement /></LeftBarUserManagement>
            </ProtectedRoute>
          } />
        <Route path="/filemanagement"
          element={
            <ProtectedRoute permissions={["Developer" , "Admin"]}>
              <LeftBarUserManagement><HeaderAdmin /><FileManagement /></LeftBarUserManagement>
            </ProtectedRoute>
          } />
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
