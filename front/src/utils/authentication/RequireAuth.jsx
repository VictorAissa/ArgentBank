import { Navigate } from "react-router-dom";

function RequireAuth({ children }) {
    const jwt = localStorage.getItem("jwt");

    // L'utilisateur peut accéder aux enfants de RequireAuth à condition que le jwt existe
    // sinon il est redirigé vers la page SignIn
    return jwt ? children : <Navigate to="/signin" replace />;
}

export default RequireAuth;
