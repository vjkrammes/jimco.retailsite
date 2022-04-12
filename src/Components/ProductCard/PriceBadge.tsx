import { IProduct } from "../../Interfaces/IProduct";
import { toCurrency } from "../../Services/tools";
import "./PriceBadge.css";

type Props = {
  product: IProduct;
};

export default function PriceBadge({ product }: Props) {
  if (product.currentPromotion === null) {
    return <span className="pc__price">{toCurrency(product.price)}</span>;
  } else {
    return (
      <div className="pc__pricecontainer">
        <span className="pc__promotion">
          {toCurrency(product.currentPromotion.price)}&nbsp;
          <span className="pc__reduce">
            through&nbsp;
            {new Date(product.currentPromotion.stopDate).toLocaleDateString()}
          </span>
        </span>
        <span className="pc__oldprice">{toCurrency(product.price)}</span>
      </div>
    );
  }
}
