import { useState } from "react";
import { ICompletedOrder } from "../../Interfaces/ICompletedOrder";
import { GetOrders } from "../../Services/OrderService";
import { MdClear, MdHome, MdRemoveRedEye, MdSearch } from "react-icons/md";
import "./MyOrdersPage.css";
import { statusDescription } from "../../Services/tools";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../Contexts/AlertContext";
import { toCurrency } from "../../Services/tools";
import SmallAgeBadge from "../SmallAgeBadge/SmallAgeBadge";
import OrderDetail from "../OrderDetail/OrderDetail";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<ICompletedOrder[] | null>(null);
  const [email, setEmail] = useState<string>("");
  const [pin, setPin] = useState<number>(0);
  const [selectedOrder, setSelectedOrder] = useState<ICompletedOrder | null>(
    null
  );
  const navigate = useNavigate();
  const { setAlert } = useAlert();
  const modal = document.getElementById("mop__modal");

  function totalCost(order: ICompletedOrder): number {
    if (order) {
      if (order.lineItems && order.lineItems.length > 0) {
        let total = 0;
        for (let i = 0; i < order.lineItems.length; i++) {
          total += order.lineItems[i].quantity * order.lineItems[i].price;
        }
        return total;
      }
    }
    return 0;
  }

  function changeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }
  function changePin(e: React.ChangeEvent<HTMLInputElement>) {
    setPin(Number(e.target.value));
  }

  async function getOrders() {
    if (email && pin) {
      const orders = await GetOrders(email, pin);
      if (orders && orders.length) {
        setOrders(orders);
      } else {
        setOrders(null);
      }
    } else {
      setAlert("Please enter an Email address and Pin", "error");
      setOrders(null);
    }
  }

  function reset() {
    setOrders(null);
    setEmail("");
    setPin(0);
    document.getElementById("searchEmail")?.focus();
  }

  function viewDetails(order: ICompletedOrder) {
    if (modal) {
      setSelectedOrder(order);
      // @ts-ignore
      modal.showModal();
    }
  }

  function closeDetails() {
    if (modal) {
      // @ts-ignore
      modal.close();
    }
  }

  return (
    <div className="myorderspage">
      <dialog className="mop__modal" id="mop__modal">
        {selectedOrder && <OrderDetail order={selectedOrder} />}
        {!selectedOrder && (
          <div className="noorderselected">No Order Selected</div>
        )}
        <button className="mop__button mop__closebutton" onClick={closeDetails}>
          Close
        </button>
      </dialog>
      <div className="mop__header">Your Orders</div>
      <div className="mop__top">
        <div className="mop__topitem">
          <span className="mop__topitemlabel">Email:</span>
          <div className="mop__topitemvalue">
            <input
              type="text"
              value={email}
              id="searchEmail"
              onChange={changeEmail}
              autoFocus
            />
          </div>
        </div>
        <div className="mop__topitem">
          <span className="mop__topitemlabel">Pin:</span>
          <div className="mop__topitemvalue">
            <input type="number" value={pin} onChange={changePin} />
          </div>
        </div>
        <div className="mop__topitem mop__topbuttoncontainer">
          <button
            type="button"
            className="mop__button mop__searchbutton"
            onClick={getOrders}>
            <span>
              <MdSearch /> Search
            </span>
          </button>
          <button
            type="reset"
            className="mop__button mop__resetbutton"
            onClick={reset}>
            <span>
              <MdClear /> Reset
            </span>
          </button>
        </div>
      </div>
      <div className="mop__orders">
        {orders && (
          <div className="mop__orderlist">
            <div className="mop__orderheader">Orders</div>
            <div className="mop__orderitem">
              <div className="mop__orderitemheader">&nbsp;</div>
              <div className="mop__orderitemheader">Date</div>
              <div className="mop__orderitemheader">Status</div>
              <div className="mop__orderitemheader">Items</div>
              <div className="mop__orderitemheader">Total</div>
              <div className="mop__orderitemheader">&nbsp;</div>
            </div>
            {orders.map((x) => (
              <div className="mop__orderitem" key={x.id}>
                <div className="mop__orderitemage">
                  <SmallAgeBadge ageRequired={x.ageRequired} />
                </div>
                <div className="mop__orderitemcell">
                  {new Date(x.statusDate).toLocaleDateString()}
                </div>
                <div className="mop__orderitemcell">
                  {statusDescription(x.status)}
                </div>
                <div className="mop__orderitemcell">{x.lineItems?.length}</div>
                <div className="mop__orderitemcell">
                  {toCurrency(totalCost(x))}
                </div>
                <div className="mop__orderitemcell mop__orderbuttoncell">
                  <button
                    className="mop__button mop__viewbutton"
                    title="View order details"
                    onClick={() => viewDetails(x)}>
                    <span>
                      <MdRemoveRedEye />
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {!orders && (
          <div className="mop__noorders">No Matching Orders Found</div>
        )}
      </div>
      <div className="mop__buttoncontainer">
        <button
          className="mop__button mop__homebutton"
          onClick={() => navigate("/")}>
          <span>
            <MdHome /> Home
          </span>
        </button>
      </div>
    </div>
  );
}
