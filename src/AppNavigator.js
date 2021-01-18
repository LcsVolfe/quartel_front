import React, { useContext, createContext, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";
import router from "./AppRouter";
import {Template} from "./components/template";
import LoginPage from "./pages/login";
import {useProvideAuth} from "./components/login/action-creators";



const authContext = createContext();

function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}

function useAuth() {
    return useContext(authContext);
}



function PrivateRoute({ children, ...rest }) {
    let auth = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                localStorage.getItem('AuthorizationToken') ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}


const AppNavigator = () => {

    return (
        <ProvideAuth>
            <Router>
                <div>
                    <Switch>
                        <Route path="/login">
                            <LoginPage useAuth={useAuth} />
                        </Route>
                       {router.map((item, index) => {
                          if (item.path == '/')
                              return (
                                  <PrivateRoute exact key={index} path={item.path}>
                                      <Template useAuth={useAuth} content={item.component} />
                                  </PrivateRoute>
                              )
                          else
                              return (
                                  <PrivateRoute key={index} path={item.path}>
                                      <Template useAuth={useAuth} content={item.component} />
                                  </PrivateRoute>
                              )
                      })}
                    </Switch>
                </div>
            </Router>
        </ProvideAuth>
    );
  // return (
  //     <ProvideAuth>
  //         <Router>
  //             <Switch>
  //               {router.map((item, index) => {
  //                   if (item.path == '/')
  //                       return (
  //                           <Route exact key={index} path={item.path}>
  //                               <Template content={item.component} />
  //                           </Route>
  //                       )
  //                   else
  //                       return (
  //                           <Route key={index} path={item.path}>
  //                               <Template content={item.component} />
  //                           </Route>
  //                       )
  //               })}
  //             </Switch>
  //         </Router>
  //     </ProvideAuth>
  // );
}
export default AppNavigator;


