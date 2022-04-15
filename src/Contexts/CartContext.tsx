import React, { createContext, useContext, useState } from "react";
import { ICart } from "../Interfaces/ICart";

const CartContext = createContext<ICart>(emptyCart());
const SetCartContext = createContext<
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
      <SetCartContext.Provider value={setCart}>
        {children}
      </SetCartContext.Provider>
    </CartContext.Provider>
  );
}

export function useCart(): [
  cart: ICart,
  setCart: React.Dispatch<React.SetStateAction<ICart>>
] {
  const cart = useContext(CartContext);
  const setCart = useContext(SetCartContext);
  if (!setCart) {
    throw new Error("The CartProvider is missing");
  }
  return [cart, setCart];
}

export function emptyCart(): ICart {
  return {
    created: new Date(),
    updated: new Date(),
    items: [],
  };
}
