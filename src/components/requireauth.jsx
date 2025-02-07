
import { Navigate,useLocation } from "react-router-dom"
import useAuth from "../../auth/authorizer.jsx"

function RequireAuth({ children }) {
  const { authorized } = useAuth();
  const location = useLocation();
  return authorized=== true ? (
    children
  ) : (
    <Navigate to="/" replace state={{ path: location.pathname }} />
  );
}

export default RequireAuth