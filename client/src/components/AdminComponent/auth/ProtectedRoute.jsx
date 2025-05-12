import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

function RequireAuth({ allowedRole }) {
  const { isLoggedIn, role } = useSelector((state) => state.auth);

  return isLoggedIn && allowedRole.find((myRole) => myRole == role) ? (
    <Outlet />
  ) : isLoggedIn ? (
    <Navigate to="/" />
  ) : (
    <Navigate to="/Login" />
  );
}
export default RequireAuth;
