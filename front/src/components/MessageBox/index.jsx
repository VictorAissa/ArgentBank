import "./index.scss";

function MessageBox({ message }) {
    return (
        <div className="message-box_container">
            <p className="message-box_message">{message}</p>
        </div>
    );
}

export default MessageBox;
