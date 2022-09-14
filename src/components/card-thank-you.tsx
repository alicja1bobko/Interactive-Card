import "./card-form.scss";
import "./thank-you.scss";
import iconComplete from "../assets/images/icon-complete.svg";
type Props = {
  resetForm: () => void;
};

const ThankYouPage: React.FunctionComponent<Props> = ({ resetForm }) => {
  return (
    <div className="card">
      <div className="thank-you-page">
        <img src={iconComplete} alt="icon completed" />
        <h1 id="thank-you-heading">Thank you!</h1>
        <p>We've added your card details</p>
        <button className="submit-btn" onClick={resetForm}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default ThankYouPage;
