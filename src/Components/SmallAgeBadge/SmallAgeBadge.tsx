type Props = {
  ageRequired: number;
};

export default function SmallAgeBadge({ ageRequired }: Props) {
  if (ageRequired === 0) {
    return <span>&nbsp;</span>;
  } else {
    const title =
      "You must be at least " +
      ageRequired +
      " years old with an ID to accept delivery of this item.";
    const alt = "age " + ageRequired + " plus";
    let source;
    switch (ageRequired) {
      case 13:
        source = "/images/13plus.svg";
        break;
      case 16:
        source = "/images/16plus.svg";
        break;
      case 18:
        source = "/images/18plus.svg";
        break;
      case 21:
        source = "/images/21plus.svg";
        break;
      default:
        return (
          <span className="oab__minage" title={title}>
            {ageRequired}+
          </span>
        );
    }
    return (
      <span>
        <img
          title={title}
          alt={alt}
          className="oab__image"
          src={source}
          height={16}
        />
      </span>
    );
  }
}
