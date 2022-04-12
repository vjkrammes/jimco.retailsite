import { Link } from "react-router-dom";
import "./NotFoundPage.css";

export default function NotFoundPage() {
  return (
    <div className="notfoundpage">
      <h1 className="notfoundheader">
        The requested page or item was not found.
      </h1>
      <div className="homebutton">
        <Link to="/">Home</Link>
      </div>
    </div>
  );
}
