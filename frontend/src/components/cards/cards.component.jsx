import React from "react";

import { data } from "./data";

import Cards from "./cards";

import "./cards.styles.scss";

export default function CardWrapper() {
  let cardItems = data.map(item => {
    return <Cards />;
  });
  return <div>{cardItems}</div>;
}
