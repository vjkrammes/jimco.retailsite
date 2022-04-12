import "./Header.css";
import Marquee from "../Marquee/Marquee";
import SearchWidget from "../SearchWidget/SearchWidget";
import CartWidget from "../CartWidget/CartWidget";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  function changeRoute(path: string) {
    navigate(path);
  }
  return (
    <header>
      <div className="header-logo">
        <a href="/">
          <img src="images/logo64.png" alt="JimCo Logo" />
          <span className="logotitle">Retailers</span>
        </a>
      </div>
      <Marquee />
      <SearchWidget />
      <button
        className="myorders"
        type="button"
        onClick={() => changeRoute("/MyOrders")}>
        My&nbsp;Orders
      </button>
      <CartWidget />
    </header>
  );
}
