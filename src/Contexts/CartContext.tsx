import React, { createContext, useContext, useState } from "react";
import { ICart } from "../Interfaces/ICart";

const CartContext = createContext<ICart>(emptyCart());
const CartSetContext = createContext<
  React.Dispatch<React.SetStateAction<ICart>>
>(null!);

export default CartContext;

type Props = {
  children: JSX.Element;
};

export function CartProvider({ children }: Props) {
  const [cart, setCart] = useState<ICart>(emptyCart());
  return (
    <CartContext.Provider value={cart}>
      <CartSetContext.Provider value={setCart}>
        {children}
      </CartSetContext.Provider>
    </CartContext.Provider>
  );
}

export function useCart(): [
  ICart,
  React.Dispatch<React.SetStateAction<ICart>>
] {
  const cart = useContext(CartContext);
  const setCart = useContext(CartSetContext);
  if (!setCart) {
    throw new Error("The CartProvider is missing");
  }
  return [cart, setCart];
}

export function emptyCart(): ICart {
  return {
    signature: "",
    created: new Date(),
    updated: new Date(),
    items: [],
  };
}
