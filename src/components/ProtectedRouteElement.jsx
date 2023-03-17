import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { onlyAuth, onlyGuest } from '../utils/constants';
import { getCookie } from '../utils/utility-function';

export const ProtectedRouteElement = ({ element, accessLevel }) => {
  const {user} = useSelector(state => state.profile)
  const auth = useSelector(state => state.auth)
  const cookie = getCookie()

  if (accessLevel == onlyAuth) {
    return cookie.accessToken ? element : <Navigate to="/login" replace />;
  }

  if (accessLevel == onlyGuest) {
    return !cookie.accessToken ? element : <Navigate to="/" replace />;
  }
}