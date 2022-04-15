import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Contexts/CartContext";
import { toCurrency, uriBuilder } from "../../Services/tools";
import { IOrder } from "../../Interfaces/IOrder";
import { useAlert } from "../../Contexts/AlertContext";
import { MdCancel, MdArrowBack, MdCheckCircle } from "react-icons/md";
import "./PlaceOrderPage.css";

export default function PlaceOrderPage() {
  const navigate = useNavigate();
  const [cart] = useCart();
  const [cartTotal, setCartTotal] = useState(0);
  const { setAlert } = useAlert();
  const [order, setOrder] = useState<IOrder>({
    email: "",
    pin: 0,
    name: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postalCode: "",
    createDate: cart.created,
    updateDate: cart.updated,
    lineItems: cart.items,
  });
  function changeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setOrder({ ...order, email: e.target.value });
  }
  function changePin(e: React.ChangeEvent<HTMLInputElement>) {
    setOrder({ ...order, pin: Number(e.target.value) });
  }
  function changeName(e: React.ChangeEvent<HTMLInputElement>) {
    setOrder({ ...order, name: e.target.value });
  }
  function changeAddress1(e: React.ChangeEvent<HTMLInputElement>) {
    setOrder({ ...order, address1: e.target.value });
  }
  function changeAddress2(e: React.ChangeEvent<HTMLInputElement>) {
    setOrder({ ...order, address2: e.target.value });
  }
  function changeCity(e: React.ChangeEvent<HTMLInputElement>) {
    setOrder({ ...order, city: e.target.value });
  }
  function changeState(e: React.ChangeEvent<HTMLInputElement>) {
    setOrder({ ...order, state: e.target.value });
  }
  function changePostalCode(e: React.ChangeEvent<HTMLInputElement>) {
    setOrder({ ...order, postalCode: e.target.value });
  }

  async function handleSubmit() {
    if (
      order.email &&
      order.pin > 0 &&
      order.name &&
      order.address1 &&
      order.city &&
      order.state &&
      order.postalCode
    ) {
      fetch(uriBuilder("Order/Create"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      })
        .then(async (response) => {
          if (response.ok) {
            const result = await response.json();
            console.log(result);
            navigate(`/OrderCreated/${result.id}`);
          }
        })
        .catch(async (error) => {
          const apierror = await error.json();
          setAlert(apierror.message, "error", 10000);
        });
    } else {
      setAlert("All fields marked with a red star are required", "error");
    }
  }

  useEffect(() => {
    var total = 0;
    if (cart && cart.items && cart.items.length > 0) {
      for (var i = 0; i < cart.items.length; i++) {
        total += cart.items[i].price * cart.items[i].quantity;
      }
    }
    setCartTotal(total);
  }, [cart]);
  useEffect(() => {
    if (cart === null || cart.items === null || cart.items.length === 0) {
      navigate("/");
      return;
    }
    setOrder({ ...order, lineItems: cart.items });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="placeorderpage">
      <div className="placeorderheader">Place your Order</div>
      <div className="placeordersummary">
        <div className="summaryitem">
          <span>Total Items:</span>
          <span>{cart.items?.length}</span>
        </div>
        <div className="summaryitem">
          <span>Total Cost:</span>
          <span>{toCurrency(cartTotal)}</span>
        </div>
      </div>
      <div className="po__formcontainer">
        <div className="po__banner">Shipping Details</div>
        <form>
          <div className="po__formrow">
            <div className="po__formitem">
              <label className="po__itemlabel" htmlFor="email">
                Email<span className="redstar">*</span>
              </label>
              <input
                autoFocus
                type="email"
                name="email"
                className="po__forminput"
                placeholder="Email"
                id="email"
                value={order.email}
                onChange={changeEmail}
              />
            </div>
            <div className="po__formitem">
              <label className="po__itemlabel" htmlFor="pin">
                PIN<span className="redstar">*</span>
              </label>
              <input
                type="number"
                name="pin"
                className="po__forminput"
                placeholder="PIN"
                id="pin"
                value={order.pin}
                onChange={changePin}
              />
            </div>
          </div>
          <div className="po__formrow">
            <div className="po__banner">Shipping Address</div>
          </div>
          <div className="po__formrow">
            <div className="po__formitem">
              <label className="po__itemlabel" htmlFor="name">
                Name<span className="redstar">*</span>
              </label>
              <input
                type="text"
                name="name"
                className="po__forminput"
                placeholder="Name"
                id="name"
                value={order.name}
                onChange={changeName}
              />
            </div>
            <div className="po__formitem">
              <label className="po__itemlabel" htmlFor="address1">
                Address<span className="redstar">*</span>
              </label>
              <input
                type="text"
                name="address1"
                className="po__forminput"
                placeholder="Address Line 1"
                id="address1"
                value={order.address1}
                onChange={changeAddress1}
              />
            </div>
          </div>
          <div className="po__formrow">
            <div className="po__formitem">
              <label className="po__itemlabel" htmlFor="address2">
                Address
              </label>
              <input
                type="text"
                name="address2"
                className="po__forminput"
                placeholder="Address Line 2"
                id="address2"
                value={order.address2}
                onChange={changeAddress2}
              />
            </div>
            <div className="po__formitem">
              <label className="po__itemlabel" htmlFor="city">
                City<span className="redstar">*</span>
              </label>
              <input
                type="text"
                name="city"
                className="po__forminput"
                placeholder="City"
                id="city"
                value={order.city}
                onChange={changeCity}
              />
            </div>
          </div>
          <div className="po__formrow">
            <div className="po__formitem">
              <label className="po__itemlabel" htmlFor="state">
                State<span className="redstar">*</span>
              </label>
              <input
                type="text"
                name="state"
                className="po__forminput"
                placeholder="State"
                id="state"
                value={order.state}
                onChange={changeState}
              />
            </div>
            <div className="po__formitem">
              <label className="po__itemlabel" htmlFor="zip">
                Postal Code<span className="redstar">*</span>
              </label>
              <input
                type="text"
                name="zip"
                className="po__forminput"
                placeholder="Postal Code"
                id="zip"
                value={order.postalCode}
                onChange={changePostalCode}
              />
            </div>
          </div>
          <div className="po__formrow">
            <div className="po__formitem">
              <label className="po__itemlabel" htmlFor="cardnumber">
                Card Number
              </label>
              <select>
                <option
                  value={0}
                  className="po__forminput po__cardSelect"
                  defaultValue={0}>
                  (Use card on file)
                </option>
              </select>
            </div>
            <div className="po__formitem"></div>
          </div>
          <div className="po__buttoncontainer">
            <button
              type="button"
              className="po__formbutton"
              onClick={() => navigate("/")}>
              <MdCancel /> Cancel
            </button>
            <button
              type="button"
              className="po__formbutton"
              onClick={() => navigate("/Checkout")}>
              <MdArrowBack /> Back
            </button>
            <button
              type="button"
              className="po__formbutton"
              onClick={handleSubmit}>
              <MdCheckCircle /> Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
