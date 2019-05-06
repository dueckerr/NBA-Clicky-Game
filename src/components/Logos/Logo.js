import React from "react";
import "./Logo.css";

const Logo = props => (
    <div className="card" onClick={() => props.clickCount(props.id)}>
    <div className="img-container">
    <img alt={props.team} src={props.image} />
    </div>
  </div>
);

export default Logo;