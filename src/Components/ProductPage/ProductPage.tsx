import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ICategory } from "../../Interfaces/ICategory";
import { IProduct } from "../../Interfaces/IProduct";
import { GetCategory } from "../../Services/CategoryService";
import { ProductsForCategory } from "../../Services/ProductService";
import { getHex } from "../../Services/ColorService";
import CategoryAgeBadge from "./CategoryAgeBadge";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductPage.css";

export default function ProductPage() {
  const { categoryId } = useParams();
  const [category, setCategory] = useState<ICategory | null>(null);
  const [products, setProducts] = useState<IProduct[]>();
  useEffect(() => {
    if (categoryId) {
      GetCategory(categoryId).then((data) => {
        if (data) {
          setCategory(data);
        } else {
          setCategory(null);
        }
      });
    } else {
      setCategory(null);
    }
  }, [categoryId]);
  useEffect(() => {
    if (category) {
      ProductsForCategory(category.id).then((data) => {
        if (data) {
          setProducts(data);
        }
      });
    }
  }, [category]);
  if (category) {
    return (
      <div className="productpage">
        <div
          className="productheader"
          style={{ backgroundColor: getHex(category.background) }}>
          <span className="categoryage">
            <CategoryAgeBadge category={category} />
          </span>
          <span className="categoryname">{category.name}</span>
          <span className="categoryicon">
            <img src={"/images/" + category.image} alt="" />
          </span>
        </div>
        <div className="productlist">
          {(products === undefined || products.length === 0) && (
            <div className="noproducts">No products found in this category</div>
          )}
          {products &&
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                showCategory={false}
              />
            ))}
        </div>
      </div>
    );
  } else {
    return <div className="nocategoryheader">Category not found</div>;
  }
}
