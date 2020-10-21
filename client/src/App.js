import React, { Component } from "react";
import NavBar from "./components/navbar/navbar";
import Home from "./Views/LandingPage/Home";
import Auth from "./Views/Auth/Auth";
import AdminAuth from "./components/verfication";
import { Switch, Route } from "react-router-dom";
import Outer from './components/compouterbody/outer.jsx';
import AdminPanel from './Views/AdminPanel/AdminPanel'

class App extends Component {
  render() {
    return (
      <div>
        <Route component={NavBar} path="/" />
        <Switch>
                 <Route path="/products" exact component={Outer} />
          <Route exact component={Home} path="/" />
          <Route exact component={Auth} path="/auth" />
          <Route exact component={AdminPanel} path="/adminpanel" />
          <Route exact component={AdminAuth} path="/auth/:id" />
        </Switch>
      </div>
    );
  }
}

export default App;
