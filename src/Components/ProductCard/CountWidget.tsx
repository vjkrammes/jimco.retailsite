import React from "react";
import { ImPlus, ImMinus } from "react-icons/im";
import "./CountWidget.css";

type Props = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  quantity: number;
  quantityExceeded: (quantity: number) => void;
};

export default function CountWidget({
  count,
  setCount,
  quantity,
  quantityExceeded,
}: Props) {
  return (
    <div className="cw__container">
      <button
        className="cw__button"
        title="Decrease Quantity"
        onClick={() => {
          if (count > 1) {
            setCount(count - 1);
          }
        }}>
        <ImMinus />
      </button>
      <span className="cw__counter">{count}</span>
      <button
        className="cw__button"
        title="Increase Quantity"
        onClick={() => {
          if (count < quantity) {
            setCount(count + 1);
          } else {
            quantityExceeded(quantity);
          }
        }}>
        <ImPlus />
      </button>
    </div>
  );
}
