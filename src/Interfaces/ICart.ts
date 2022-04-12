import { IItem } from "./IItem";

export interface ICart {
  signature: string;
  created: Date;
  updated: Date;
  items: IItem[] | null;
}
