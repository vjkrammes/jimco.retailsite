import React from "react";
import { useState } from "react";
import { GetCategories } from "../../Services/CategoryService";
import SideBarItem from "./SideBarItem";
import Spinner from "../Spinner/Spinner";
import { useEffect } from "react";
import { MdError } from "react-icons/md";
import { ICategory } from "../../Interfaces/ICategory";
import "./Sidebar.css";

type Props = {
  category: ICategory;
  setCategory: React.Dispatch<React.SetStateAction<ICategory>>;
};

export default function Sidebar({ category, setCategory }: Props) {
  const [status, setStatus] = useState("loading");
  const [categories, setCategories] = useState<ICategory[] | null>(null);
  const [showNav, setShowNav] = useState(true);
  const home: ICategory = {
    id: "0",
    name: "Home",
    background: "White",
    ageRequired: 0,
    isAgeRestricted: false,
    image: "home-32.png",
    canDelete: false,
  };
  useEffect(() => {
    GetCategories()
      .then((data) => {
        setCategories(data);
        setStatus("success");
      })
      .catch((error) => {
        setStatus("error");
      });
  }, []);

  function toggleNav() {
    setShowNav(!showNav);
  }

  if (status === "error") {
    return (
      <div className="sidebar" title="Error retrieving Categories">
        <h1>
          <MdError /> Error
        </h1>
      </div>
    );
  }
  if (status === "loading") {
    return (
      <p>
        <Spinner /> Loading...
      </p>
    );
  }
  return (
    <>
      <input
        type="checkbox"
        className="nav-toggle"
        id="nav-toggle"
        defaultChecked={showNav}
        onChange={toggleNav}
      />
      <div className="sidebar">
        <nav>
          <ul>
            <li key={"0"}>
              <SideBarItem
                key="0"
                category={home}
                setSelectedCategory={setCategory}
                isCurrent={category === null}
              />
            </li>
            {categories &&
              categories.map((c) => (
                <li key={c.id}>
                  <SideBarItem
                    key={c.id}
                    category={c}
                    setSelectedCategory={setCategory}
                    isCurrent={c === category}
                  />
                </li>
              ))}
          </ul>
        </nav>
        <label htmlFor="nav-toggle" className="nav-toggle-label">
          <span></span>
        </label>
      </div>
    </>
  );
}
