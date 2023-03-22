import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/Home'
import { NotFound404 } from './pages/Not-found';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/Forgot-password';
import ResetPassword from './pages/Reset-password';
import Profile from './pages/Profile';
import { ProtectedRouteElement } from './components/ProtectedRouteElement';
import { onlyAuth, onlyGuest } from './utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from './services/actions/itemList';
import {useEffect, useState} from 'react'
import IngredientDescription from './pages/Ingredient-discription';
import AppHeader from './components/AppHeader/AppHeader';

export default function App() {
  const location = useLocation()
  const otherPath = location.state && location.state.otherPath;
  const dispatch = useDispatch()
  const { items } = useSelector(state => state.items)

  useEffect(() => {
    if (!items.length) { dispatch(getItems()) }
  }, [dispatch])

  return (
    <>
      {!otherPath &&
        <Routes>
          <Route path="/" element={<HomePage data={items.data} />} />

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
          {/* <Route path="/profile/orders" element={<ProtectedRouteElement
            accessLevel={onlyAuth}
            element={<Profile />} />} /> */}

          <Route path="/ingredients/:id" element={<HomePage data={items.data} />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>}
      {items.success && otherPath &&
        <Routes>
          <Route path="/ingredients/:id" element={
            <>
              <AppHeader />
              <IngredientDescription data={items.data} />
            </>
          } />
        </Routes>}
    </>
  );
}