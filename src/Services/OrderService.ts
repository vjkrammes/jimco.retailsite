import { ICompletedOrder } from "../Interfaces/ICompletedOrder";
import { getData } from "./api";
import { uriBuilder } from "./tools";

export function GetOrders(
  email: string,
  pin: number
): Promise<ICompletedOrder[] | null> {
  const uri = uriBuilder("Order/ByEmail/" + email + "/" + pin);
  return getData(uri)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw new Error(error);
    });
}

export function ReadOrder(orderId: string): Promise<ICompletedOrder | null> {
  const uri = uriBuilder("Order/ById/" + orderId);
  return getData(uri)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw new Error(error);
    });
}
