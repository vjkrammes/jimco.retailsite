import { ICategory } from "../../Interfaces/ICategory";
import "./CategoryAgeBadge.css";

type Props = {
  category: ICategory;
};

export default function CategoryAgeBadge({ category }: Props) {
  const title =
    "You must be at least " +
    category.ageRequired +
    " years old to purchase items in this category";
  const alt = "age " + category.ageRequired + " plus";
  if (category.ageRequired === 0) {
    return <span>&nbsp;</span>;
  }
  switch (category.ageRequired) {
    case 13: {
      return (
        <span>
          <img
            title={title}
            alt={alt}
            className="cab__image"
            src="/images/13plus.svg"
            height={32}
          />
        </span>
      );
    }
    case 16:
      return (
        <span>
          <img
            title={title}
            alt={alt}
            className="cab__image"
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
            className="cab__image"
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
            className="cab__image"
            src="/images/21plus.svg"
            height={32}
          />
        </span>
      );
    default:
      return (
        <span className="cab__minage" title={title}>
          Age {category.ageRequired}+
        </span>
      );
  }
}
