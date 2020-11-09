import React, {useEffect} from 'react';
import Session from "../Kernel/Services/SessionService";
import {Link} from "react-router-dom";

const Application = (props) => {

    useEffect(()=>{
        document.title = 'App';
    })

    return (
        <div className="App">
            <h1>Application</h1>

            <table>
                <tr>
                    <th width="150px">Uživatelské jméno:</th>
                    <td>{Session.getUsername()}</td>
                </tr>
                {/*
                <tr>
                    <th>Role:</th>
                    <td>{Session.getRole()}</td>
                </tr>

                <tr>
                    <th>Oslovení:</th>
                    <td>{Session.hasRole("ROLE_USER") ? "Uživateli": "Admine"}</td>
                </tr>
                */}
            </table>

            <Link to="/logout">Odhlásit se</Link>
        </div>
    );
}

export default Application;