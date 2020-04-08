import React from "react";

import Auxi from "../../../hoc/Auxilary";

const orderSummary = (props) => {
  console.log(props);
  const summary = Object.keys(props.ingredients).map((key) => {
    return (
      <li key={key}>
        {key}:{props.ingredients[key]}
      </li>
    );
  });
  return (
    <Auxi>
      <h3>Your order summary:</h3>
      <ul>{summary}</ul>
    </Auxi>
  );
};
export default orderSummary;
