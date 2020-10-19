import React, { Component } from "react";
import NavBar from "./components/navbar/navbar";
import Home from "./Views/LandingPage/Home";
import Auth from "./Views/Auth/Auth";
import AdminAuth from "./components/verfication";
import { Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <Route component={NavBar} path="/" />
        <Switch>
          <Route exact component={Home} path="/" />
          <Route exact component={Auth} path="/auth" />
          <Route exact component={AdminAuth} path="/auth/:id" />
        </Switch>
      </div>
    );
  }
}

export default App;
