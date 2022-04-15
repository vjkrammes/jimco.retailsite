import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReadOrder } from "../../Services/OrderService";
import { deleteCookie } from "../../Services/CookieService";
import AppSettings from "../../static.json";
import { ICompletedOrder } from "../../Interfaces/ICompletedOrder";
import OrderDetail from "../OrderDetail/OrderDetail";
import { useCart, emptyCart } from "../../Contexts/CartContext";
import NotFoundWidget from "../NotFoundWidget/NotFoundWidget";
import { MdHome } from "react-icons/md";
import "./OrderCreatedPage.css";

export default function OrderCreatedPage() {
  const [order, setOrder] = useState<ICompletedOrder | null>(null);
  const [, setCart] = useCart();
  const { orderId } = useParams<string>();
  const navigate = useNavigate();
  useEffect(() => {
    async function doReadOrder() {
      if (orderId) {
        const order = await ReadOrder(orderId);
        if (order) {
          setOrder(order);
        }
      }
    }
    doReadOrder();
  }, [orderId]);
  useEffect(() => {
    setCart(emptyCart());
    deleteCookie(AppSettings.cartCookie);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (order) {
    return (
      <div className="ordercreatedpage">
        <div className="ocp__heading">Your order has been Submitted</div>
        <OrderDetail order={order} />
        <button className="ocp__button" onClick={() => navigate("/")}>
          <span>
            <MdHome /> Home
          </span>
        </button>
      </div>
    );
  } else {
    return (
      <div className="ordercreatedpage">
        <NotFoundWidget item="order" redirect="/" />
      </div>
    );
  }
}
