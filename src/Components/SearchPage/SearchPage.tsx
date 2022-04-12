import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IProduct } from "../../Interfaces/IProduct";
import ProductCard from "../ProductCard/ProductCard";
import { SearchProducts } from "../../Services/ProductService";
import "./SearchPage.css";

export default function SearchPage() {
  const { searchText } = useParams();
  const [products, setProducts] = useState<IProduct[]>();
  useEffect(() => {
    if (searchText) {
      SearchProducts(searchText).then((data) => {
        if (data) {
          setProducts(data);
        }
      });
    }
  }, [searchText]);
  if (products) {
    return (
      <div className="searchpage">
        <div className="searchheader">Search results for '{searchText}'</div>
        <div className="searchresults">
          {(products === undefined || products.length === 0) && (
            <div className="noresults">No matching products were found</div>
          )}
          {products &&
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                showCategory={true}
              />
            ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="searchpage">
        <div className="searchheader">Search results for '{searchText}'</div>
        <div className="noresults">No matching products were found</div>
      </div>
    );
  }
}
