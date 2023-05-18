import "./index.scss";

function Feature({ icon, altIcon, title, description }) {
    return (
        <div className="feature-item">
            <img src={icon} alt={altIcon} className="feature-icon" />
            <h3 className="feature-item-title">{title}</h3>
            <p>{description}</p>
        </div>
    );
}

export default Feature;
