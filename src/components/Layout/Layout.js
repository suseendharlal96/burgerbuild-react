import React from "react";
import classes from "./Layout.css";

const layout = (props) => {
  return (
    <div>
      <div>toolbar,navigation bar </div>
      <main className={classes.content}>{props.children}</main>
    </div>
  );
};

export default layout;
