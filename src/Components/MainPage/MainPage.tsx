import { useEffect, useState } from "react";
import { IProduct } from "../../Interfaces/IProduct";
import { RandomProducts } from "../../Services/ProductService";
import ProductCard from "../ProductCard/ProductCard";
import Spinner from "../Spinner/Spinner";
import "./MainPage.css";

export default function MainPage() {
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    RandomProducts(3)
      .then((data) => {
        if (data) {
          setProducts(data);
          setLoading(false);
        } else {
          setProducts(null);
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);
  return (
    <div className="mainpage">
      <h1 className="mainwelcome">Welcome to the JimCo Retail site</h1>
      <h3 className="mainheader">Items selected for you!</h3>
      {products &&
        products.map((p) => (
          <ProductCard key={p.id} product={p} showCategory={true} />
        ))}
      {loading && (
        <p className="noproducts">
          <Spinner /> Loading...
        </p>
      )}
      {!products && !loading && (
        <p className="noproducts">No products were found</p>
      )}
    </div>
  );
}
