import React from "react";

import classes from "./Layout.css";
import Auxi from "../../hoc/Auxilary";

const layout = (props) => {
  return (
    <Auxi>
      <div>toolbar,navigation bar </div>
      <main className={classes.content}>{props.children}</main>
    </Auxi>
  );
};

export default layout;
