import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../features/user/userSlice";
import { fetching, resolved, rejected } from "../../features/user/userSlice";
import "./index.scss";
import { useEffect, useState } from "react";

function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const status = useSelector(selectUser).status;
    const [submitting, setSubmitting] = useState(false);
    const testParams = {
        email: "steve@rogers.com",
        password: "password456",
    };

    async function fetchLogin(params) {
        if (status === "pending" || status === "updating") {
            return;
        }
        dispatch(fetching());
        try {
            const response = await fetch(
                "http://localhost:3001/api/v1/user/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(params),
                }
            );
            const data = await response.json();
            if (data.status === 400) {
                dispatch(rejected(data.message));
                return;
            }
            dispatch(resolved(data));
        } catch (error) {
            dispatch(rejected("Erreur réseau"));
        }
    }

    const submitForm = async (event, params) => {
        event.preventDefault();
        setSubmitting(true);
        await fetchLogin(params);
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
                <form>
                    <div className="input-wrapper">
                        <label for="username">Username</label>
                        <input type="text" id="username" />
                    </div>
                    <div className="input-wrapper">
                        <label for="password">Password</label>
                        <input type="password" id="password" />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label for="remember-me">Remember me</label>
                    </div>
                    <button
                        className="sign-in-button"
                        onClick={(event) => {
                            submitForm(event, testParams);
                        }}
                    >
                        Sign In
                    </button>
                </form>
            </section>
        </div>
    );
}

export default SignIn;
