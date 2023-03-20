import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { onlyAuth, onlyGuest } from '../utils/constants';
import { getCookie } from '../utils/utility-function';

export const ProtectedRouteElement = ({ element, accessLevel }) => {
  const {logged} = useSelector(state => state.auth)
  // const cookie = getCookie()
  const location = useLocation()

  if (accessLevel == onlyAuth) {
    return logged ? element : <Navigate to="/login" state={location} />;
  }

  if (accessLevel == onlyGuest) {
    return !logged ? element 
      : <Navigate to={location.state ? location.state.pathname : '/'} replace />;
  }
}