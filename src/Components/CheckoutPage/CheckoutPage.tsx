import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Contexts/CartContext";
import { FaHome } from "react-icons/fa";
import { ImPlus, ImMinus, ImBin } from "react-icons/im";
import { toCurrency } from "../../Services/tools";
import { ReadProduct } from "../../Services/ProductService";
import { IProduct } from "../../Interfaces/IProduct";
import { setCookie } from "../../Services/CookieService";
import AppSettings from "../../static.json";
import { useAlert } from "../../Contexts/AlertContext";
import "./CheckoutPage.css";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [ageRequired, setAgeRequired] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const { setAlert } = useAlert();

  async function getProduct(productId: string): Promise<IProduct | null> {
    return await ReadProduct(productId);
  }

  const [products, setProducts] = useState<{ [key: string]: IProduct }>();

  useEffect(() => {
    if (cart === null || cart.items === null || cart.items.length === 0) {
      navigate("/");
    }
  }, []);

  function updateCart() {
    const newCart = {
      ...cart,
      updated: new Date(),
    };
    setCart(newCart);
    setCookie(AppSettings.cartCookie, JSON.stringify(newCart), 60);
    calculateTotal();
  }

  function Increase(productId: string) {
    var item = cart.items?.find((x) => x.productId === productId);
    if (item) {
      var q = getQuantity(productId);
      if (item.quantity < q) {
        item.quantity++;
        updateCart();
      } else {
        setAlert(`Only ${q} in stock!`, "error");
      }
    }
  }

  function Decrease(productId: string) {
    var item = cart.items?.find((x) => x.productId === productId);
    if (item) {
      if (item.quantity > 1) {
        item.quantity--;
        updateCart();
      } else {
        setAlert("Use the 'Remove' button to remove items", "info");
      }
    }
  }

  function Remove(productId: string) {
    const newitems = cart.items?.filter((x) => x.productId !== productId);
    if (newitems) {
      cart.items = newitems;
    } else {
      cart.items = [];
    }
    updateCart();
  }

  function getProductName(productId: string): string {
    if (products) {
      if (products[productId]) {
        return products[productId].name;
      }
    }
    return "";
  }

  function getQuantity(productId: string): number {
    if (products) {
      if (products[productId]) {
        return products[productId].quantity;
      }
    }
    return 0;
  }

  function calculateTotal() {
    var total = 0;
    if (cart && cart.items && cart.items.length > 0) {
      for (var i = 0; i < cart.items.length; i++) {
        const itemprice = cart.items[i].price * cart.items[i].quantity;
        total += itemprice;
      }
    }
    setCartTotal(total);
  }

  useEffect(() => {
    const doGetProduct = async () => {
      const prods: { [key: string]: IProduct } = {};
      if (cart !== null) {
        for (var i = 0; i < cart!.items!.length; i++) {
          if (cart.items !== null && cart.items[i] !== null) {
            const prodid = cart.items[i].productId;
            const prod = await getProduct(prodid);
            if (prod) {
              if (prod.ageRequired > ageRequired) {
                setAgeRequired(prod.ageRequired);
              }
              prods[prodid] = prod;
            }
          }
        }
        calculateTotal();
        setProducts(prods);
      }
    };
    doGetProduct();
  }, []);
  if (cart !== null && cart.items !== null && cart.items.length > 0) {
    return (
      <div className="checkoutpage">
        <div className="checkoutheader">Your Cart</div>
        <button
          type="button"
          className="cop__homebutton"
          onClick={() => {
            navigate("/");
          }}>
          <span>
            <FaHome />
            Home
          </span>
        </button>
        <div className="carttablecontainer">
          <table className="carttable">
            <thead>
              <tr>
                <th>#</th>
                <th>Item</th>
                <th className="text-right nosmall">Unit Price</th>
                <th className="text-right">Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="lineitems">
              {cart.items
                ?.sort((left, right) =>
                  left.productId > right.productId ? 1 : -1
                )
                .map((x) => (
                  <tr key={x.productId}>
                    <td>{x.quantity}</td>
                    <td className="itemdescription">
                      {getProductName(x.productId)}
                    </td>
                    <td className="text-right nosmall">
                      {toCurrency(x.price)}
                    </td>
                    <td className="text-right">
                      {toCurrency(x.price * x.quantity)}
                    </td>
                    <td>
                      <div className="actionbar">
                        <button
                          className="actionbutton"
                          onClick={() => Increase(x.productId)}>
                          <span>
                            <ImPlus />
                          </span>
                        </button>
                        <button
                          className="actionbutton"
                          onClick={() => Decrease(x.productId)}>
                          <span>
                            <ImMinus />
                          </span>
                        </button>
                        <button
                          className="actionbutton dangerbutton"
                          onClick={() => Remove(x.productId)}>
                          <span>
                            <ImBin />
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              <tr>
                {ageRequired >= 18 && (
                  <>
                    <td colSpan={2} className="text-left idrequired">
                      <strong>Warning!</strong>&nbsp; Delivery to an adult at
                      least {ageRequired} years of age with ID is required.
                    </td>
                    <td className="text-right nosmall">
                      <strong>Total:</strong>
                    </td>
                  </>
                )}
                {ageRequired < 18 && (
                  <td colSpan={3} className="text-right nosmall">
                    <strong>Total:</strong>
                  </td>
                )}
                <td className="text-right totalamount">
                  {toCurrency(cartTotal)}
                </td>
                <td className="ordercell">
                  <button
                    type="button"
                    className="placeorderbutton"
                    onClick={() => navigate("/PlaceOrder")}>
                    <span>Buy</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  } else {
    return (
      <div className="checkoutpage">
        <div className="checkoutheader">Your Cart</div>
        <button
          type="button"
          className="cop__homebutton"
          onClick={() => {
            navigate("/");
          }}>
          <span>
            <FaHome />
            Home
          </span>
        </button>
        <div className="cartempty">Your cart is empty</div>
      </div>
    );
  }
}
