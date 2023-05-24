import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";
import { fetching, resolved, rejected } from "../../features/user/userSlice";
import Account from "../../components/Account";
import UserEditForm from "../../components/userEditForm";
import "./index.scss";

function User() {
    const dispatch = useDispatch();
    const status = useSelector(selectUser).status;
    const authError = useSelector(selectUser).error.profile;
    const data = useSelector(selectUser).data;

    // const jwt = useSelector(selectUser).token;
    const jwt = localStorage.getItem("jwt");
    const [isOpen, setIsOpen] = useState(false);
    const profileUrl = "http://localhost:3001/api/v1/user/profile";

    async function fetchProfile(url, token) {
        if (status === "pending" || status === "updating") {
            return;
        }
        dispatch(fetching());
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            });
            const data = await response.json();
            if (data.status === 401) {
                dispatch(rejected(data.status, data.message));
                return;
            }
            dispatch(resolved(data));
        } catch (error) {
            dispatch(rejected("Erreur réseau"));
        }
    }

    useEffect(() => {
        fetchProfile(profileUrl, jwt);
    }, []);

    return (
        <div className="user_container bg-dark">
            <div className="user-header">
                {authError ? (
                    authError
                ) : isOpen ? (
                    <UserEditForm />
                ) : (
                    <>
                        <h1>
                            Welcome back
                            <br />
                            {data?.firstName + " " + data?.lastName}
                        </h1>
                        <button
                            className="edit-button"
                            onClick={() => setIsOpen(true)}
                        >
                            Edit Name
                        </button>
                    </>
                )}
            </div>
            <h2 className="sr-only">Accounts</h2>
            <Account
                title="Argent Bank Checking (x8349)"
                amount="$2,082.79"
                description="Available Balance"
            />
            <Account
                title="Argent Bank Savings (x6712)"
                amount="$10,928.42"
                description="Available Balance"
            />
            <Account
                title="Argent Bank Credit Card (x8349))"
                amount="$184.30"
                description="Current Balance"
            />
        </div>
    );
}

export default User;
