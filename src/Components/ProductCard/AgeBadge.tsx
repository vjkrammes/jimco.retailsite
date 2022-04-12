import { IProduct } from "../../Interfaces/IProduct";
import "./AgeBadge.css";

type Props = {
  product: IProduct;
};

export default function AgeBadge({ product }: Props) {
  const age = Math.max(product.ageRequired, product.category.ageRequired);
  const title =
    "You must be at least " + age + " years old to purchase this item";
  const alt = "age " + age + " plus";
  if (age > 0) {
    switch (age) {
      case 13:
        return (
          <span>
            <img
              title={title}
              alt={alt}
              className="ab__image"
              src="/images/13plus.svg"
              height={32}
            />
          </span>
        );
      case 16:
        return (
          <span>
            <img
              title={title}
              alt={alt}
              className="ab__image"
              src="/images/16plus.svg"
              height={32}
            />
          </span>
        );
      case 18:
        return (
          <span>
            <img
              title={title}
              alt={alt}
              className="ab__image"
              src="/images/18plus.svg"
              height={32}
            />
          </span>
        );
      case 21:
        return (
          <span>
            <img
              title={title}
              alt={alt}
              className="ab__image"
              src="/images/21plus.svg"
              height={32}
            />
          </span>
        );
      default:
        return (
          <span className="ab__minage" title={title}>
            Age {age}+
          </span>
        );
    }
  } else {
    return (
      <span
        className="ab__allages"
        title="There are no age restrictions for this item">
        All Ages!
      </span>
    );
  }
}
