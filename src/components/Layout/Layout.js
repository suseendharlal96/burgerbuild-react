import React from "react";

import classes from "./Layout.css";
import Auxi from "../../hoc/Auxilary";
import Toolbar from "../Navigation/Toolbar/Toolbar";

const layout = (props) => {
  return (
    <Auxi>
      <Toolbar />
      <main className={classes.content}>{props.children}</main>
    </Auxi>
  );
};

export default layout;
