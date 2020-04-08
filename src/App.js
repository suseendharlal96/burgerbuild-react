import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import Burgerbuild from "./containers/Burgerbuild/Burgerbuild";
class App extends Component {
  render() {
    return (
      <Layout>
        <Burgerbuild />
      </Layout>
    );
  }
}
export default App;
