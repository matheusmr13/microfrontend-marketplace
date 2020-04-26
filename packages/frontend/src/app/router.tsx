import React, { useEffect } from "react";

import { Switch, Route, useHistory, Redirect } from "react-router-dom";

import Home from "./home";
import Login from "modules/github/login";
import Logout from "modules/account/logout";
import LandingPage from "modules/landing";
import useLoggedUser from "base/hooks/user";
import { configureLoggedUser } from "base/hooks/request";

const LOGIN_URL = "/login";
const LANDING_PAGE_URL = "/";
const LOGGED_HOME_URL = "/home";

function Router() {
  const history = useHistory();
  const [loggedUser] = useLoggedUser();

  if (loggedUser) {
    configureLoggedUser(loggedUser);
  }

  if (!history.location.pathname.startsWith(LOGGED_HOME_URL) && !!loggedUser) {
    return <Redirect to={LOGGED_HOME_URL} />;
  }

  if (history.location.pathname.startsWith(LOGGED_HOME_URL) && !loggedUser) {
    return <Redirect to={LANDING_PAGE_URL} />;
  }

  return (
    <Switch>
      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route path="/logout">
        <Logout />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
    </Switch>
  );
}

export default Router;
