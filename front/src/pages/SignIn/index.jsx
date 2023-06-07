import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../features/user/userSlice";
import { fetchUser } from "../../features/user/userSlice";
import MessageBox from "../../components/MessageBox";
import Button from "../../components/Button";
import "./index.scss";

function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const status = useSelector(selectUser).status;
    const loginError = useSelector(selectUser).error;

    /**
     * Gère la soumission du formulaire de connexion:
     * lance une requête avec les entrées du formulaire en parametre
     *
     * @param {React.FormEvent} event - Soumission du formulaire.
     */
    const onSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const userParams = {
            email: form.elements.username.value,
            password: form.elements.password.value,
        };
        const params = {
            url: "http://localhost:3001/api/v1/user/login",
            method: "POST",
            token: undefined,
            userParams: userParams,
        };
        dispatch(fetchUser(params));
    };

    // Redirection vers le dashboard user en cas de succès de la requête
    useEffect(() => {
        if (status === "resolved") {
            navigate("/user");
        }
    }, [navigate, status]);

    return (
        <div className="signin_container bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={onSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" />
                    </div>
                    {loginError && <MessageBox message={loginError} />}
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <Button type="submit" content="Sign In" />
                </form>
            </section>
        </div>
    );
}

export default SignIn;
