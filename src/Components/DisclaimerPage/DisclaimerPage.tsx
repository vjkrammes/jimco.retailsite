import { Link } from "react-router-dom";
import "./DisclaimerPage.css";

export default function DisclaimerPage() {
  return (
    <div className="disclaimerpage">
      <h2 className="disclaimerheader">Disclaimer</h2>
      <h4 className="title">
        The entire JimCo Retailers collection of web sites is a demonstration
        application.
      </h4>
      <ol>
        <li>There is no retail company named JimCo (that I am aware of)</li>
        <li>
          There is no city in Tennessee named South Niflheim, and if there were
          it would not have a street named after poor Harambe.
        </li>
        <li>
          The location map on the "Contact" page has been purposely blurred so
          that no real location is indicated.
        </li>
        <li>None of the listed phone numbers are real.</li>
        <li>
          While the <span className="fixedfont">jimco.online</span> domain is
          real, none of the email addresses used exist.
        </li>
        <li>None of the products listed exist.</li>
        <li>None of the vendors described exist.</li>
      </ol>
      <p>Just in case there was any doubt or confusion.</p>
      <p>Thank you.</p>
      <div className="homebutton">
        <Link to="/">Home</Link>
      </div>
    </div>
  );
}
