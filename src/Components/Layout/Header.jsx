import React from "react";
import logo from "../../images/react.png";

const Header = () => {
  return (
    <div className="py-2 pl-2" style={{ borderBottom: "2px solid grey" }}>
      <img
        src={logo}
        alt="react"
        style={{ height: "35px", verticalAlign: "top" }}
      />
      <span className="h2 pt-2 m-2 text-white-50"> CyclOpedia</span>
    </div>
  );
};

export default Header;
