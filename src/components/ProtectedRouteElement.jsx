import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { onlyAuth, onlyGuest } from '../utils/constants';
import { getCookie } from '../utils/utility-function';

export const ProtectedRouteElement = ({ element, accessLevel }) => {
  // const {user} = useSelector(state => state.profile)
  const {logged} = useSelector(state => state.auth)
  const cookie = getCookie()
  const location = useLocation()

  // console.log(location)
  // console.log(location.state.state)

  if (accessLevel == onlyAuth) {
    return cookie.accessToken ? element : <Navigate to="/login" state={location} />;
  }

  if (accessLevel == onlyGuest) {
    // console.log(location.state)
    return !cookie.accessToken ? element 
      : <Navigate to={location.state ? location.state.pathname : '/'} replace />;
  }
}