import { useNavigate } from "react-router-dom";
import NotFoundWidget from "../NotFoundWidget/NotFoundWidget";
import "./NotFoundPage.css";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="notfoundpage">
      <NotFoundWidget item="page or item" redirect="/" />
    </div>
  );
}
