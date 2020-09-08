import React, { Component } from "react";
import { Switch, Redirect } from "react-router-dom";
import { baseconfigRouters } from "./router";
import forEachRouters from "@utils/forEachRouters";

export class App extends Component {
  render() {
    return (
      <Switch>
        {forEachRouters(baseconfigRouters)}
        <Redirect to={"/home"}></Redirect>
      </Switch>
    );
  }
}

export default App;
