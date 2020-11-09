import React from "react";
import {Redirect, Route} from "react-router-dom";
import Session from "../Services/SessionService";
import {setLastRoute} from "../Services/PreviousPageService";

const PrivateRoute = ({component: Component, children, ...rest}) => {
    return(
        <Route
            {...rest}
            render={(props) =>
                Session.isLoggedIn() ? (
                    Component ? <Component {...props} /> : children
                ) : (
                    <React.Fragment>
                        {setLastRoute(props.location.pathname) /* set history page*/}
                        <Redirect to={{pathname: '/login'}}/>
                    </React.Fragment>
                )
            }
        />
    )
};

export default PrivateRoute;