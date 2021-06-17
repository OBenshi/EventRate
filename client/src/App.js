import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./views/Home.js";
import SubmitEvent from "./views/SubmitEvent";
import { Wrapper } from "@googlemaps/react-wrapper";
import PrimaryAppBar from "./components/PrimaryAppBar";
import "./App.css";
import Trulolo from "./components/Trulolo.js";
import SignUp from "./views/SignUp";
import ListView from "./views/ListView.js";
import EventDetailView from "./views/EventDetailView";
function App() {
  return (
    <div>
      <Router>
        <PrimaryAppBar />
        <Switch>
          <Route exact path="/" children={<Home />} />
          <Route exact path="/trulolo" children={<Trulolo />} />
          <Route exact path="/parties" children={<ListView />} />
          <Route
            exact
            path="/parties/:partyName"
            children={<EventDetailView />}
          />
          <Route exact path="/submitevent" children={<SubmitEvent />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
