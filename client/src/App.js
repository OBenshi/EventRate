import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./views/Home.js";
import SubmitEvent from "./views/SubmitEvent";
import { Wrapper } from "@googlemaps/react-wrapper";

import "./App.css";
import Trulolo from "./components/Trulolo.js";
import SignUp from "./views/SignUp";
function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" children={<Home />} />
          <Route exact path="/trulolo" children={<Trulolo />} />
          <Route exact path="/SignIn" children={<SignUp />} />

          <Route exact path="/submitevent" children={<SubmitEvent />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
