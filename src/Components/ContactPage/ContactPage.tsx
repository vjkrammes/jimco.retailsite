import { Link } from "react-router-dom";
import appSettings from "../../static.json";
import "./ContactPage.css";

export default function ContactPage() {
  return (
    <div className="page">
      <h1 className="contactheading">JimCo Retail Contact Information</h1>
      <div className="contactpage">
        <div className="boxme">
          <h4 className="smallheader">By Phone</h4>
          <table className="listtable">
            <tbody>
              {appSettings.phoneNumbers.map((number) => (
                <tr key={number.description}>
                  <td>{number.description}</td>
                  <td>{number.number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="boxme">
          <h4 className="smallheader">By Email</h4>
          <table className="listtable">
            <tbody>
              {appSettings.emailAddresses.map((address) => (
                <tr key={address.description}>
                  <td>{address.description}</td>
                  <td>{address.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="boxme">
          <h4 className="smallheader">Our Location</h4>
          <div className="mapcontainer">
            <img
              className="map optional"
              src="/images/jimcomap.png"
              alt="location map"
              title="Location Map (blurred intentionally [see disclaimer])"
            />
            <div className="address">
              {appSettings.address.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="boxme">
          <h4 className="smallheader">Store Hours</h4>
          <table className="listtable">
            <tbody>
              {appSettings.storeHours.map((hours) => (
                <tr key={hours.day}>
                  <td>{hours.day}</td>
                  <td>{hours.hours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="homebutton">
        <Link to="/">Home</Link>
      </div>
    </div>
  );
}
