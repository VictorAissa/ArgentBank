import "./index.scss";

function ErrorBox({ message }) {
    return (
        <div className="error-box_container">
            <p className="error-box_message">{message}</p>
        </div>
    );
}

export default ErrorBox;
