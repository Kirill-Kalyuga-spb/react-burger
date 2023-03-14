import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home'
import { NotFound404 } from './pages/Not-found';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/Forgot-password';
import ResetPassword from './pages/Reset-password';
import Profile from './pages/Profile';

export default function App() {
    return (
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/ingredients/:id" element={<HomePage />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </BrowserRouter>
      
    );
  }