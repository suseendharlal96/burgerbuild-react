import React, { Component } from "react";
import { Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Burgerbuild from "./containers/Burgerbuild/Burgerbuild";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
class App extends Component {
  render() {
    return (
      <Layout>
        <Route path="/" exact component={Burgerbuild} />
        <Route path="/orders" component={Orders} />
        <Route path="/checkout" component={Checkout} />
      </Layout>
    );
  }
}
export default App;
