import React, { Component } from "react";
import NavBar from "./components/navbar/navbar";
import Home from "./Views/LandingPage/Home";
import { Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <Route component={NavBar} path="/" />
        <Switch>
          <Route exact component={Home} path="/" />
        </Switch>
      </div>
    );
  }
}

export default App;
