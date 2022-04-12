import AppSettings from "../../static.json";
import { IProduct } from "../../Interfaces/IProduct";
import "./ProductCard.css";
import PriceBadge from "./PriceBadge";
import AgeBadge from "./AgeBadge";
import CountWidget from "./CountWidget";
import React, { useState } from "react";
import { MdNotificationImportant } from "react-icons/md";
import { ICart } from "../../Interfaces/ICart";
import { useCart } from "../../Contexts/CartContext";
import { setCookie } from "../../Services/CookieService";
import { sha512 } from "js-sha512";
import { useAlert } from "../../Contexts/AlertContext";

function addToCart(
  product: IProduct,
  quantity: number,
  cart: ICart,
  setCart: React.Dispatch<React.SetStateAction<ICart>>
) {
  if (cart.items === null) {
    cart.items = [];
  }
  var newCart: ICart;
  var existing = cart.items?.find((x) => x.productId === product.id);
  if (existing !== null && existing !== undefined) {
    existing.quantity += quantity;
    const sig = sha512(JSON.stringify(cart.items));
    console.log(sig);
    newCart = {
      signature: sig,
      created: cart.created,
      updated: new Date(),
      items: cart.items,
    };
  } else {
    var newitems = cart.items;
    newitems?.push({
      productId: product.id,
      quantity: quantity,
      price:
        product.currentPromotion === null
          ? product.price
          : product.currentPromotion.price,
    });
    const sig = sha512(JSON.stringify(newitems));
    newCart = {
      signature: sig,
      created: cart.created,
      updated: new Date(),
      items: newitems,
    };
  }
  setCart(newCart);
  setCookie(AppSettings.cartCookie, JSON.stringify(newCart), 60);
}

type Props = {
  product: IProduct;
  showCategory: boolean;
};

export default function ProductCard({ product, showCategory }: Props) {
  const [cart, setCart] = useCart();
  const [count, setCount] = useState(1);
  const { setAlert } = useAlert();
  return (
    <div className="pc__card">
      <div className="pc__cardheader">
        {showCategory && (
          <span className="pc__alignleft pc__grow">
            <span className="pc__reduce">{product.vendor.name}&nbsp;</span>
            <span className="pc__productname">{product.name}</span>&nbsp;
            <span className="pc__reduce">
              in{" "}
              <img
                src={"/images/" + product.category.image}
                height={"16"}
                alt=""
              />{" "}
              {product.category.name}
            </span>
          </span>
        )}
        {!showCategory && (
          <span className="pc__alignleft pc__grow">
            <span className="pc__reduce">{product.vendor.name}&nbsp;</span>
            <span className="pc__productname">{product.name}</span>
          </span>
        )}
        <span className="pc__alignright">
          <PriceBadge product={product} />
        </span>{" "}
      </div>
      <div className="pc__cardbody">
        <p>
          {product.discontinued && (
            <span className="pc__disco">
              <MdNotificationImportant />
              &nbsp;Discontinued!
            </span>
          )}
          {product.description}
        </p>
      </div>
      <div className="pc__cardfooter">
        <span className="pc__alignleft">
          <AgeBadge product={product} />
        </span>{" "}
        {product.quantity <= 0 && (
          <span className="pc__lowstock pc__grow">
            Item is currently out of stock
          </span>
        )}
        {product.quantity > 0 &&
          product.quantity <= AppSettings.lowQuantity && (
            <span className="pc__lowstock pc__grow">
              Only {product.quantity} left!
            </span>
          )}
        {product.quantity > AppSettings.lowQuantity && (
          <span className="pc__lowstock pc__grow">&nbsp;</span>
        )}
        {product.quantity && (
          <div className="pc__buttoncontainer">
            <CountWidget
              count={count}
              setCount={setCount}
              quantity={product.quantity}
              quantityExceeded={() => {
                setAlert(`Only ${product.quantity} in stock!`, "error");
              }}
            />
            <button
              className="pc__addbutton pc__alignright"
              onClick={() => addToCart(product, count, cart, setCart)}>
              Add To Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
