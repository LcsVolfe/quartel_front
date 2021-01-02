import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import router from "./AppRouter";


export default function AppNavigator() {
  return (
      <Router>
          <Switch>
            {router.map((item, index) => (
                <Route key={index} path={item.path}>
                    {item.component}
                </Route>
            ))}
          </Switch>
      </Router>
  );
}
