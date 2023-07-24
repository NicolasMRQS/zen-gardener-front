import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function RequireAuth() {
  const { userIsLoggedIn } = useSelector((state) => state.session);
  const location = useLocation();

  return (
    <>
      {userIsLoggedIn && <Outlet />}
      {!userIsLoggedIn && <Navigate to="/login" state={{ from: location }} replace />}
    </>
  );
}

export default RequireAuth;
