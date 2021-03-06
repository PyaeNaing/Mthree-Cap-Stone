import React, { Component } from "react";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage"
import Navigation from "./components/Navigation"

import backGround from "./BackGround.jpg"

import { BrowserRouter } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import SchedulePage from "./pages/SchedulePage";
import CheapFlightsPage from "./pages/CheapFlightsPage";
import BestTimePage from "./pages/BestTimePage";

class App extends Component {
  render() {


    return (
      <div style={
        { backgroundImage: `url('https://i.stack.imgur.com/pMAiU.jpg')`,
          backgroundSize: '100%', minHeight: "100vh"}
      }>

        <BrowserRouter>
        <Navigation />
        <Switch>
          <Route exact path="/schedule" component={SchedulePage} />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/cheapFlights" component={CheapFlightsPage} />
          <Route exact path="/bestTime" component={BestTimePage} />
        </Switch>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
