import React, {useEffect} from 'react';

import Session from "../Kernel/Services/SessionService";
import {Redirect} from "react-router-dom";

const Logout = () =>
{
    useEffect(() => {
        Session.logout();
        document.title = 'Probíhá odhlašování';
    }, []);

    return <Redirect to="/login" />
};

export default Logout;