import { useNavigate } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { TiInfoLarge } from "react-icons/ti";
import "./ArchitecturePage.css";

export default function ArchitecturePage() {
  const navigate = useNavigate();
  return (
    <div className="architecturepage">
      <h3 className="archheader">JimCo Retail Site Architecture</h3>
      <img
        src="/images/JimCoArchitecture.jpg"
        width={900}
        className="centerimage"
      />
      <div className="buttoncontainer">
        <button className="a__button" onClick={() => navigate("/")}>
          <span>
            <MdHome /> Home
          </span>
        </button>
        <button className="a__button" onClick={() => navigate("/About")}>
          <span>
            <TiInfoLarge /> About
          </span>
        </button>
      </div>
    </div>
  );
}
