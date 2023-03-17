import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home'
import { NotFound404 } from './pages/Not-found';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/Forgot-password';
import ResetPassword from './pages/Reset-password';
import Profile from './pages/Profile';
import { ProtectedRouteElement } from './components/ProtectedRouteElement';
import { onlyAuth, onlyGuest } from './utils/constants';

export default function App() {
    return (
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/login" element={<ProtectedRouteElement
            accessLevel={onlyGuest}
            element={<Login />} />} />
          <Route path="/register" element={<ProtectedRouteElement
            accessLevel={onlyGuest}
            element={<Register />} />} />
          <Route path="/forgot-password" element={<ProtectedRouteElement
            accessLevel={onlyGuest}
            element={<ForgotPassword />} />} />
          <Route path="/reset-password" element={<ProtectedRouteElement
            accessLevel={onlyGuest}
            element={<ResetPassword />} />} />

          <Route path="/profile" element={<ProtectedRouteElement
            accessLevel={onlyAuth}
            element={<Profile />} />} />

          <Route path="/ingredients/:id" element={<HomePage />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </BrowserRouter>
      
    );
  }