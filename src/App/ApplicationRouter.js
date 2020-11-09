import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NoMatch from "../Kernel/Components/NoMatch";
import Home from "../Components/Home";
import Layout from "../Components/Layout/Layout";

const ApplicationRouter = () => {
    return (
        <Router>
            <Switch>
                {/* App component */}
                <Layout>
                    <Route exact path="/" component={Home}/>
                </Layout>

                {/* Route not found - 404 */}
                <Route path="*" component={NoMatch}/>
            </Switch>
        </Router>
    );
}

export default ApplicationRouter;