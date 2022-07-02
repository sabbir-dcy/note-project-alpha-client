import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { Navigate, useLocation } from "react-router-dom";
import { auth } from "../firebase/firebase.init";

function RequireAuth({ children }) {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  if (loading) {
    return;
  }
  if (!user) {
    toast("u have been logged out", {
      id: "1",
      icon: "👆",
    });
  }

  if (!user) {
    return (
      <Navigate to="/dashboard/login" state={{ from: location }} replace />
    );
  }

  return children;
}
export default RequireAuth;
