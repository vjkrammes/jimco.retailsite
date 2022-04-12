import React, { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { Link } from "react-router-dom";
import "./SearchWidget.css";

export default function SearchWidget() {
  const [searchText, setSearchText] = useState("");
  const [buttonClass, setButtonClass] = useState(" disabledlink");
  function changeSearchText(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
    if (e.target.value?.length === 0) {
      setButtonClass(" disabledlink");
    } else {
      setButtonClass("");
    }
  }
  return (
    <div className="searchwidget">
      <form className="searchform">
        <input
          className="searchtext"
          type="search"
          placeholder="Search"
          value={searchText}
          onChange={(e) => changeSearchText(e)}
        />
        <Link
          to={"/search/" + searchText}
          className={"searchbutton" + buttonClass}>
          <BiSearchAlt2 />
        </Link>
      </form>
    </div>
  );
}
