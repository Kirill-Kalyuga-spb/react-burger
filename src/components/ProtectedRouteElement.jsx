import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { onlyAuth, onlyGuest } from '../utils/constants';
import { getCookie } from '../utils/utility-function';

export const ProtectedRouteElement = ({ element, accessLevel }) => {
  const {logged} = useSelector(state => state.auth)
  const accessToken = getCookie().accessToken
  const location = useLocation()

  if (accessLevel == onlyAuth) {
    return accessToken ? element : <Navigate to="/login" state={location} />;
  }

  if (accessLevel == onlyGuest) {
    return !accessToken ? element 
      : <Navigate to={location.state ? location.state.pathname : '/'} replace />;
  }
}