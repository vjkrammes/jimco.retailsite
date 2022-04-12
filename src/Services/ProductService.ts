import { getData } from "./api";
import { IProduct } from "../Interfaces/IProduct";
import { uriBuilder } from "./tools";

export function RandomProducts(count: number): Promise<IProduct[] | null> {
  const uri = uriBuilder("Product/Random/" + count);
  return getData(uri)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw new Error(error);
    });
}

export function ProductsForCategory(categoryId: string): Promise<IProduct[]> {
  const uri = uriBuilder("Product/ForCategory/" + categoryId);
  return getData(uri)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw new Error(error);
    });
}

export function SearchProducts(searchText: string): Promise<IProduct[]> {
  const uri = uriBuilder("Product/Search/" + searchText);
  return getData(uri)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw new Error(error);
    });
}

export function ReadProduct(productId: string): Promise<IProduct | null> {
  const uri = uriBuilder("Product/ById/" + productId);
  return getData(uri)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw new Error(error);
    });
}
