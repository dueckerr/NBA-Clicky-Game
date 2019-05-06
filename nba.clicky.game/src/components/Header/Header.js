import React from "react";
import "./Header.css";

const Header = props => (
  <div className="header">
    <div className="Header">{props.children}</div>
    <div className="scores">
      Score: {props.score} Highscore: {props.highscore}
    </div>
  </div>
);

export default Header;