import React, { Component } from "react";
import NavBar from "./components/navbar/navbar";
import Home from "./Views/LandingPage/Home";
import Auth from "./Views/Auth/Auth";
import AdminAuth from "./components/verfication";
import { Switch, Route } from "react-router-dom";
import Outer from './components/compouterbody/outer.jsx';
import Products from './components/Product';
import AdminPanel from './Views/AdminPanel/AdminPanel'

class App extends Component {
  render() {
    const token=localStorage.getItem('verficationuserId')
    return (
      <div>
        <Route component={NavBar} path="/" />
        <Switch>
                 <Route path="/products" exact component={Outer} />
                 <Route path="/products/:id" exact component={Products} />
          <Route exact component={Home} path="/" />
          <Route exact component={Auth} path="/auth"/>
 {!token?
          <Route exact component={AdminPanel} path="/adminpanel" />:null
        }
          <Route exact component={AdminAuth} path="/auth/:id" />
        </Switch>
      </div>
    );
  }
}

export default App;
