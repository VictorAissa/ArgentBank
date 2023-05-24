import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";
import "./index.scss";

function UserEditForm() {
    const data = useSelector(selectUser).data;
    const onSubmit = () => {};
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
                    <button type="reset" className="sign-in-button">
                        Cancel
                    </button>
                </div>
            </form>
        </section>
    );
}

export default UserEditForm;
