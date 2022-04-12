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

  if (status === "error") {
    return (
      <div className="sidebar" title="Error retrieving Categories">
        <h1>
          <MdError />
          &nbsp;Error
        </h1>
      </div>
    );
  }
  if (status === "loading") {
    return (
      <p>
        <Spinner />
        &nbsp;Loading...
      </p>
    );
  }
  return (
    <div className="sidebar">
      <SideBarItem
        key="0"
        category={home}
        setSelectedCategory={() => {}}
        isCurrent={false}
      />
      {categories &&
        categories.map((c) => (
          <SideBarItem
            key={c.id}
            category={c}
            setSelectedCategory={setCategory}
            isCurrent={c === category}
          />
        ))}
    </div>
  );
}
