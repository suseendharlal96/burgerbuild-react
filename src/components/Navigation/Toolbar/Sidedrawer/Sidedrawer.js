import React from "react";

import Backdrop from "../../../Backdrop/Backdrop";
import Aux from "../../../../hoc/Auxilary";
import Logo from "../../../Logo/Logo";
import NavigationItems from "../../NavigationItems/NavigationItems";
import classes from "./Sidedrawer.css";

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Aux>
      <Backdrop show={props.open} click={props.closed} />
      <div className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
