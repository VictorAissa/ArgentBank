import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";
import { fetchUser } from "../../features/user/userSlice";
import Account from "../../components/Account";
import UserEditForm from "../../components/userEditForm";
import MessageBox from "../../components/MessageBox";
import "./index.scss";

function User() {
    const dispatch = useDispatch();
    const authError = useSelector(selectUser).error;
    const data = useSelector(selectUser).data;
    const [isOpen, setIsOpen] = useState(false);
    const profileUrl = "http://localhost:3001/api/v1/user/profile";

    // Appel de la fonction de requête pour la récupération des données utilisateur après
    // vérification du token
    useEffect(() => {
        const params = {
            url: profileUrl,
            method: "POST",
            token: localStorage.getItem("jwt"),
            userParams: undefined,
        };
        dispatch(fetchUser(params));
    }, [dispatch]);

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <div className="user_container bg-dark">
            <div className="user-header">
                {/* Affichage du message d'erreur s'il existe ou du message d'accueil ou du formulaire
                de modification des données utilisateur */}
                {authError ? (
                    <MessageBox message={authError} />
                ) : isOpen ? (
                    <UserEditForm url={profileUrl} onClose={handleClose} />
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
