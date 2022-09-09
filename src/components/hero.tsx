import React from "react";
import "./hero.scss";

type Props = {};

export const Hero = (props: Props) => {
  return (
    <div className="card-hero">
      <div id="card-front">
        <span id="card-number">0000 0000 0000 0000</span>
        <div id="card-personal-data">
          <span>Jane Appleseed</span>
          <span>00/00</span>
        </div>
      </div>
      <div id="card-back">
        <span>000</span>
      </div>
    </div>
  );
};
