import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from '../../pages/Home'
import NotFound404 from '../../pages/Not-found';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import ForgotPassword from '../../pages/Forgot-password';
import ResetPassword from '../../pages/Reset-password';
import Profile from '../../pages/Profile';
import { ProtectedRouteElement } from '../ProtectedRouteElement';
import { onlyAuth, onlyGuest } from '../../utils/constants';
import { getItems } from '../../services/actions/itemList';
import {useEffect} from 'react'
import IngredientDescription from '../../pages/Ingredient-discription';
import AppHeader from '../AppHeader/AppHeader';
import Orders from '../../pages/Orders';
import OrderInfo from '../../pages/OrderInfo';
import Feed from '../../pages/Feed';
import { useDispatch, useSelector } from '../../hooks/hooks';

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
      <AppHeader />
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
        <Route path="/profile/orders" element={<ProtectedRouteElement
          accessLevel={onlyAuth}
          element={<Orders />} />} />
        {otherPath ? <Route path="/profile/orders/:id" element={<ProtectedRouteElement
          accessLevel={onlyAuth}
          element={<Orders />} />} />
          : <Route path="/profile/orders/:id" element={<ProtectedRouteElement
            accessLevel={onlyAuth}
            element={<OrderInfo />} />} />}

        <Route path="/feed" element={<Feed />} />
        {otherPath ? <Route path="/feed/:id" element={<Feed />} />
          : <Route path="/feed/:id" element={<OrderInfo />} />}

        {otherPath ? <Route path="/ingredients/:id" element={<HomePage />} />
          : <Route path="/ingredients/:id" element={items.length != 0 ? <IngredientDescription />
            : <>loading...</>} />}

        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </>
  );
}