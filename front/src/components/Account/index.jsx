import Button from "../Button";
import "./index.scss";

function Account({ title, amount, description }) {
    const buttonStyleTablet = {
        minWidth: window.innerWidth > 720 ? "200px" : undefined,
    };

    return (
        <section className="account">
            <div className="account-content-wrapper">
                <h3 className="account-title">{title}</h3>
                <p className="account-amount">{amount}</p>
                <p className="account-amount-description">{description}</p>
            </div>
            <div className="account-content-wrapper cta">
                <Button
                    type="button"
                    content="View transactions"
                    style={buttonStyleTablet}
                />
            </div>
        </section>
    );
}

export default Account;
