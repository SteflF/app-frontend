import React from "react";
import {Link} from "react-router-dom";
import {setLastRoute} from "../Services/PreviousPageService";

const LinkWithHistory = ({children, ...rest}) =>
{
    return (
        <Link {...rest} onClick={() => setLastRoute(window.location.pathname)}>{children}</Link>
    )
}

export default LinkWithHistory;