import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ImCart } from "react-icons/im";
import { MdPayments } from "react-icons/md";
import { useCart } from "../../Contexts/CartContext";
import { getCookie } from "../../Services/CookieService";
import { ICart } from "../../Interfaces/ICart";
import AppSettings from "../../static.json";
import "./CartWidget.css";

export default function CartWidget() {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  function itemize(count: number | undefined): string {
    return count === 1 ? "item" : "items";
  }
  function changeRoute(newPath: string) {
    navigate(newPath);
  }
  useEffect(() => {
    let cartcookie = getCookie(AppSettings.cartCookie);
    if (cartcookie !== "") {
      let cart: ICart = JSON.parse(cartcookie);
      setCart({
        created: cart.created,
        updated: cart.updated,
        items: cart.items,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="cartwidget">
      <ImCart />
      {cart && (
        <Fragment>
          <span className="cartcount">
            ({cart.items?.length}
            <span className="cartoptional">
              &nbsp;{itemize(cart.items?.length)}
            </span>
            )
          </span>
          {cart.items?.length !== 0 && (
            <button
              className="cartbutton"
              title="Check Out"
              onClick={() => changeRoute("/checkout")}>
              <MdPayments />
            </button>
          )}
          {(cart.items?.length === undefined || cart.items?.length === 0) && (
            <button className="cartbutton disabledbutton" title="Check Out">
              <MdPayments />
            </button>
          )}
        </Fragment>
      )}
    </div>
  );
}
