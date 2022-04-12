import { getData } from "./api";
import { ICategory } from "../Interfaces/ICategory";
import { uriBuilder } from "./tools";

export function GetCategories(): Promise<ICategory[] | null> {
  const uri = uriBuilder("Category");
  return getData(uri)
    .then((data) => {
      if (data) {
        return data;
      } else {
        return null;
      }
    })
    .catch((error) => {
      throw new Error(error);
    });
}

export function GetCategory(id: string): Promise<ICategory | null> {
  const uri = uriBuilder("Category/ById/" + id);
  return getData(uri)
    .then((data) => {
      if (data) {
        return data;
      } else {
        return null;
      }
    })
    .catch((error) => {
      throw new Error(error);
    });
}
