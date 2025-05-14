import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

function CheckLoggedIn() {
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  return (isLoggedIn && role == "ADMIN") || role == "AUTHOR" ? (
    <Navigate to={"Admin"} />
  ) : role == "USER" ? (
    <Navigate to={"/"} />
  ) : (
    <Outlet />
  );
}
export default CheckLoggedIn;
