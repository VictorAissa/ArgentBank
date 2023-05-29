import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";
import { eraseData } from "../../features/user/userSlice";

import logo from "../../assets/argentBankLogo.png";
import "./index.scss";

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const status = useSelector(selectUser).status;
    const jwt = localStorage.getItem("jwt");

    /**
     * Gère la déconnexion: réinitialise les valeurs du state et le token puis
     * redirige vers la page d'accueil
     *
     * @param {React.FormEvent} event - Clic sur le boutton de déconnexion
     */
    const disconnect = (event) => {
        event.preventDefault();
        dispatch(eraseData());
        localStorage.removeItem("jwt");
        navigate("/");
    };

    return (
        <header className="header_container">
            <nav className="main-nav">
                <Link to="/" className="main-nav-logo">
                    <img
                        className="main-nav-logo-image"
                        src={logo}
                        alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </Link>
                <div className="inside-nav">
                    {/* Ajout d'un bouton permettant la navigation vers le dashboard user sans passer
                    par la page Signin */}
                    {jwt && (
                        <Link to="/user" className="main-nav-item">
                            <i className="fa fa-line-chart"></i>
                            <span>Dashboard</span>
                        </Link>
                    )}
                    {/* Modification du boutton de navigation vers SignIn en boutton de déconnexion
                    si l'utilisateur est déjà connecté */}
                    {status === "resolved" ? (
                        <Link
                            to="/"
                            className="main-nav-item"
                            onClick={(event) => disconnect(event)}
                        >
                            <i className="fa fa-user-circle"></i>
                            <span>Sign Out</span>
                        </Link>
                    ) : (
                        <Link to="/signin" className="main-nav-item">
                            <i className="fa fa-user-circle"></i>
                            <span>Sign In</span>
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Header;
