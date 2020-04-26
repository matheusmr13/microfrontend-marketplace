import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import Details from "./details";
import List from "./list";
import New from "./new";

function ApplicationHome() {
  let match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${match.path}/new`}>
        <New />
      </Route>
      <Route path={`${match.path}/:applicationId`}>
        <Details />
      </Route>
      <Route path={match.path}>
        <List />
      </Route>
    </Switch>
  );
}

export default ApplicationHome;
