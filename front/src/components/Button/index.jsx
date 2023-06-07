import "./index.scss";

function Button({ type, content, style, onClick }) {
    return (
        <button
            type={type}
            className="generic-button"
            style={style}
            onClick={onClick}
        >
            {content}
        </button>
    );
}

export default Button;
