import { Link } from "react-router-dom";
import "./ArchitecturePage.css";

export default function ArchitecturePage() {
  return (
    <div className="architecturepage">
      <h3 className="archheader">JimCo Retail Site Architecture</h3>
      <img
        src="/images/JimCoArchitecture.jpg"
        width={900}
        className="centerimage"
      />
      <div className="buttoncontainer">
        <div className="homebutton">
          <Link to="/">Home</Link>
        </div>
        <div className="homebutton">
          <Link to="/About">About</Link>
        </div>
      </div>
    </div>
  );
}
