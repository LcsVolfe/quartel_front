import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import router from "./AppRouter";
import DashboardPage from "./pages/dashboard";
import {Template} from "./components/template";


export default function AppNavigator() {
  return (
      <Router>
          <Switch>
            {router.map((item, index) => {
                if (item.path == '/')
                    return (
                        <Route exact key={index} path={item.path}>
                            <Template content={item.component} />
                        </Route>
                    )
                else
                    return (
                        <Route key={index} path={item.path}>
                            <Template content={item.component} />
                        </Route>
                    )
            })}
          </Switch>
      </Router>
  );
}
