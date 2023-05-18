import { Link } from "react-router-dom";
import logo from "../../assets/argentBankLogo.png";
import "./index.scss";

function Header() {
    return (
        <header className="header_container">
            <nav className="main-nav">
                <Link to="/" class="main-nav-logo">
                    <img
                        className="main-nav-logo-image"
                        src={logo}
                        alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </Link>
                <div>
                    <Link to="/signin" class="main-nav-item">
                        <i className="fa fa-user-circle"></i>
                        <span>Sign In</span>
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default Header;
