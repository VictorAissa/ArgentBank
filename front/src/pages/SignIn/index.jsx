import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../features/user/userSlice";
import { fetching, resolved, rejected } from "../../features/user/userSlice";
import "./index.scss";

function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const status = useSelector(selectUser).status;
    const loginError = useSelector(selectUser).error.login;
    const [submitting, setSubmitting] = useState(false);
    const loginUrl = "http://localhost:3001/api/v1/user/login";

    async function fetchLogin(params) {
        if (status === "pending" || status === "updating") {
            return;
        }
        dispatch(fetching());
        try {
            const response = await fetch(loginUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(params),
            });
            const data = await response.json();
            if (data.status === 400) {
                dispatch(rejected(data.status, data.message));
                return;
            }
            if (localStorage.getItem("jwt")) {
                localStorage.removeItem("jwt");
            }
            localStorage.setItem("jwt", data.body.token);
            dispatch(resolved(data));
        } catch (error) {
            dispatch(rejected("Erreur réseau"));
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        const form = event.currentTarget;
        const userParams = {
            email: form.elements.username.value,
            password: form.elements.password.value,
        };
        await fetchLogin(userParams);
        setSubmitting(false);
    };

    useEffect(() => {
        if (status === "resolved" && submitting) {
            navigate("/user");
        }
    }, [navigate, status, submitting]);

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
                    {loginError && <span>{loginError}</span>}
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button type="submit" className="sign-in-button">
                        Sign In
                    </button>
                </form>
            </section>
        </div>
    );
}

export default SignIn;
