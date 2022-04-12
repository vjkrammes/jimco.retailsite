import React from "react";
import { getHex } from "../../Services/ColorService";
import { Link } from "react-router-dom";
import { ICategory } from "../../Interfaces/ICategory";
import "./SideBarItem.css";

type Props = {
  category: ICategory;
  setSelectedCategory: React.Dispatch<React.SetStateAction<ICategory>>;
  isCurrent: boolean;
};

export default function SideBarItem({
  category,
  setSelectedCategory,
  isCurrent,
}: Props) {
  function categoryClick(cat: ICategory) {
    setSelectedCategory(cat);
  }
  if (category) {
    const bg = { backgroundColor: getHex(category.background) };
    const border = isCurrent
      ? { border: "3px solid var(--accent-color)" }
      : { border: "1px solid var(--black-color)" };
    if (category.id === "0") {
      return (
        <Link className="sidebarlink" to="/">
          <div className="sidebaritem" style={{ ...bg, ...border }}>
            <img
              className="sidebaricon"
              src={"images/" + category.image}
              alt="category icon"
            />
            <span className="sidebarname">{category.name}</span>
          </div>
        </Link>
      );
    } else {
      return (
        <Link className="sidebarlink" to={"/Product/" + category.id}>
          <div
            className="sidebaritem"
            onClick={() => categoryClick(category)}
            style={{ ...bg, ...border }}>
            <img
              className="sidebaricon"
              src={"images/" + category.image}
              alt="category icon"
            />
            <span className="sidebarname">{category.name}</span>
          </div>
        </Link>
      );
    }
  }
  return <span></span>;
}
