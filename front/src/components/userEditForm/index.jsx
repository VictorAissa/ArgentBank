import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";
import { fetchUser } from "../../features/user/userSlice";
import MessageBox from "../MessageBox";
import "./index.scss";

function UserEditForm({ url, onClose }) {
    const dispatch = useDispatch();
    const data = useSelector(selectUser).data;
    const [succesMessage, setSuccessMessage] = useState();

    /**
     * Gère la soumission du formulaire d'édition des données utilisateur:
     * lance une requête avec les entrées du formulaire et le token en parametres
     * puis ferme le formulaire après affichage du message de succès pendant 2s
     *
     * @param {React.FormEvent} event - Soumission du formulaire.
     */
    const onSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const userParams = {
            userName: form.elements.username.value,
        };
        const params = {
            url: url,
            method: "PUT",
            token: localStorage.getItem("jwt"),
            userParams: userParams,
        };
        const message = await dispatch(fetchUser(params));
        setTimeout(() => {
            onClose();
        }, 2000);
        setSuccessMessage(message);
    };

    return (
        <section className="user-edit-form_container">
            <h2>Edit user info</h2>
            <form onSubmit={onSubmit}>
                <div className="user-edit-form_input-wrapper">
                    <label htmlFor="username">User name:</label>
                    <input
                        type="text"
                        id="username"
                        placeholder={data.userName}
                        required
                    />
                </div>
                <div className="user-edit-form_input-wrapper">
                    <label htmlFor="firstname">First name:</label>
                    <input
                        type="text"
                        id="firstname"
                        placeholder={data.firstName}
                        readOnly
                    />
                </div>
                <div className="user-edit-form_input-wrapper">
                    <label htmlFor="lastname">Last name:</label>
                    <input
                        type="text"
                        id="lastname"
                        placeholder={data.lastName}
                        readOnly
                    />
                </div>
                {succesMessage && <MessageBox message={succesMessage} />}
                <div className="user-edit-form_button-wrapper">
                    <button type="submit" className="sign-in-button">
                        Save
                    </button>
                    <button
                        type="reset"
                        className="sign-in-button"
                        onClick={() => onClose()}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </section>
    );
}

export default UserEditForm;
