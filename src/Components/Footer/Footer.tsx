import { useNavigate } from "react-router-dom";
import { TiContacts, TiWarning, TiInfoLarge } from "react-icons/ti";
import "./Footer.css";

export default function Footer() {
  const navigate = useNavigate();
  function changeRoute(path: string) {
    navigate(path);
  }
  return (
    <footer>
      <button
        className="footerbutton"
        type="button"
        onClick={() => changeRoute("/Contact")}>
        <span>
          <TiContacts />
          Contact
        </span>
      </button>
      <button
        className="footerbutton"
        type="button"
        onClick={() => navigate("/Disclaimer")}>
        <span>
          <TiWarning />
          Disclaimer
        </span>
      </button>
      <div className="copyright">
        <span>
          ©&nbsp;Copyright 2019-2022 VJK Solutions, LLC. All Rights Reserved.
        </span>
      </div>
      <button
        className="footerbutton"
        type="button"
        onClick={() => navigate("/About")}>
        <span>
          <TiInfoLarge />
          About
        </span>
      </button>
    </footer>
  );
}
