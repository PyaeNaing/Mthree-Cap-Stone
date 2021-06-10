import React, { Component } from "react";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage"
import Navigation from "./components/Navigation"

import { BrowserRouter } from "react-router-dom";
import { Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/about" component={AboutPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
