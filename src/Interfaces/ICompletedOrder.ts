import { ILineItem } from "./ILineItem";

export interface ICompletedOrder {
  id: string;
  email: string;
  pin: number;
  name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  createDate: Date;
  statusDate: Date;
  status: number;
  ageRequired: number;
  signature: string;
  lineItems: ILineItem[] | null;
}
