import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import router from "./AppRouter";
import Template from "./components/template";


export default function AppNavigator() {
  return (
      <Router>
          <Switch>
            {router.map(item => (
                <Route path={item.path}>
                    {item.component}
                </Route>
            ))}
          </Switch>
      </Router>
  );
}
