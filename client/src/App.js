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
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import SignIn from "./views/SignIn";
import Dashboard from "./views/Dashboard";
import { AuthProvider } from "./Contexts/AuthContext";
import { PartyProvider } from "./Contexts/PartyContext";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { theme } from "./components/Toolbox/cssTheme";
import PrivateRoute from "./components/PrivateRoute.js";
function App() {
  return (
    <div>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Router>
              <PrimaryAppBar />
              <Switch>
                {" "}
                <PartyProvider>
                  <Route exact path="/" children={<Home />} />{" "}
                  <Route exact path="/signin" children={<SignIn />} />
                  <Route exact path="/signup" children={<SignUp />} />
                  <Route exact path="/testing" children={<Trulolo />} />
                  <Route exact path="/parties" children={<ListView />} />
                  <Route
                    exact
                    path="/parties/:partyName"
                    children={<EventDetailView />}
                  />
                  <PrivateRoute
                    exact
                    path="/dashboard"
                    children={<Dashboard />}
                  />
                  <PrivateRoute
                    exact
                    path="/submitevent"
                    children={<SubmitEvent />}
                  />
                </PartyProvider>
              </Switch>
            </Router>
          </MuiPickersUtilsProvider>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
