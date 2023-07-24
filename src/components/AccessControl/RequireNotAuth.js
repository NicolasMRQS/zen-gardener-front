import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function RequireNotAuth() {
  const { userIsLoggedIn } = useSelector((state) => state.session);
  const location = useLocation();

  return (
    <>
      {!userIsLoggedIn && <Outlet />}
      {userIsLoggedIn && <Navigate to="/tableau-de-bord" state={{ from: location }} replace />}
    </>
  );
}

export default RequireNotAuth;
