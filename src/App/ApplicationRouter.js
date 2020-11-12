import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NoMatch from "../Kernel/Components/NoMatch";
import Home from "../Components/Home";
import DeviceList from "../Components/User/Components/DeviceList";
import SensorList from "../Components/User/Components/SensorList";
import ChangePassword from "../Components/User/Components/ChangePassword";
import Layout from "../Components/Layout/Layout";

const ApplicationRouter = () => {
    return (
        <Router>
            <Switch>
                {/* App component */}
                <Layout>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/devices" component={DeviceList}/>
                    <Route exact path="/sensors" component={SensorList}/>
                    <Route exact path="/passwdChange" component={ChangePassword}/>
                </Layout>

                {/* Route not found - 404 */}
                <Route path="*" component={NoMatch}/>
            </Switch>
        </Router>
    );
}

export default ApplicationRouter;