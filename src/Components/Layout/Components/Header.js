import * as React from "react";
import Session from "../../../Kernel/Services/SessionService";
import {Link, NavLink} from "react-router-dom";

class Header extends React.Component {
    render() {
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#fuu">{Session.getUsername()}</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav w-100">
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/devices">Books</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/sensors">Authors</NavLink>
                        </li>
                        <li className="nav-item dropdown ml-auto">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {Session.getUsername()}
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                <Link className="dropdown-item" to="/passwdChange">Change password</Link>
                                <Link className="dropdown-item" to="/logout">Log out</Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Header;