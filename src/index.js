import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import PrivateRoute from "./Kernel/Routing/PrivateRouter";
import Application from "./App/ApplicationRouter";
import Login from "./Auth/Login";
import Logout from "./Auth/Logout";
import Register from "./Auth/Register";
import RenewPass from "./Auth/RecoverPassword";
import RedirectToAppRouter from "./Kernel/Routing/RedirectToAppRouter";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Switch>
                {/* Logout path */}
                <Route exact path="/logout" component={Logout} />

                {/* Auth paths */}
                <RedirectToAppRouter exact path="/login" component={Login}/>
                <RedirectToAppRouter exact path="/register" component={Register}/>
                <RedirectToAppRouter exact path="/renew" component={RenewPass}/>

                {/* App components */}
                <PrivateRoute path="/" component={Application}/>

            </Switch>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
