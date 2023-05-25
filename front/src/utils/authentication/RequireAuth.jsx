import { Navigate } from "react-router-dom";

function RequireAuth({ children }) {
    const jwt = localStorage.getItem("jwt");

    return jwt ? children : <Navigate to="/signin" replace />;
}

export default RequireAuth;
