import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";
import { fetching, resolved, rejected } from "../../features/user/userSlice";
import "./index.scss";

function UserEditForm({ url, onClose }) {
    const dispatch = useDispatch();
    const data = useSelector(selectUser).data;
    const status = useSelector(selectUser).status;
    const jwt = localStorage.getItem("jwt");

    async function fetchChangings(url, token, params) {
        if (status === "pending" || status === "updating") {
            return;
        }
        dispatch(fetching());
        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify(params),
            });
            const data = await response.json();
            if (data.status === 400 || data.status === 401) {
                dispatch(rejected(data.status, data.message));
                return;
            }
            dispatch(resolved(data));
        } catch (error) {
            dispatch(rejected(error.status, "Erreur réseau"));
        }
    }

    const onSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const userParams = {
            userName: form.elements.username.value,
        };
        fetchChangings(url, jwt, userParams);
        onClose();
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
