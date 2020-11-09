import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import LoadingComponent from "../Kernel/Components/LoadingComponent";
import Session from "../Kernel/Services/SessionService";
import {getLastRoute} from "../Kernel/Services/PreviousPageService";
import AuthService from "../Kernel/Services/AuthenticationService";

const Login = (props) =>
{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [isMounted, setMounted] = useState(false);

    useEffect(() => {
        document.title = 'Přihlášení';
        setMounted(true);
        return () => {setMounted(false)};
    }, []);

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        isMounted && setMessage("");

        if (password.length <= 3) {
            isMounted && setMessage("Heslo musí obsahovat 4 a více znaků!");
            return;
        }
        isMounted && setLoading(true);

        AuthService.login(username, password).then(res =>{
            if (res.data.status === 200) {
                let data = res.data.result;
                Session.storeAuthData(data.jwtToken, data.username);
                props.history.push(getLastRoute());
            } else {
                isMounted && setMessage("Nespráné přihlašovací údaje!");
            }
            isMounted && setLoading(false);
        });
    };

    return (
        <div className="register">
            <div className="container">
                <div className="row py-5 mt-4 ">
                    {/* Registeration Form */}
                    <div className="col-3"></div>
                    <div className="col-lg-6">
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="row">
                                <h1 className="ml-3 mb-4">Přihlásit se</h1>
                            </div>
                            <div className="row">
                                <div className="input-group col-lg-12 mb-4">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-white px-4 border-md border-right-0">
                                            <i className="fas fa-id-card-alt text-muted"/>
                                        </span>
                                    </div>
                                    <input type="text" required placeholder="Uživatelské jméno"
                                           className="form-control bg-white border-left-0 border-md"
                                           onChange={e => isMounted && setUsername(e.target.value)}
                                    />
                                </div>

                                <div className="input-group col-lg-12 mb-4">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-white px-4 border-md border-right-0">
                                            <i className="fad fa-lock-alt text-muted"/>
                                        </span>
                                    </div>
                                    <input type="password" required placeholder="Heslo"
                                           className="form-control bg-white border-left-0 border-md"
                                           onChange={e => isMounted && setPassword(e.target.value)}
                                    />
                                </div>

                                {loading === true && (
                                    <div className="form-group text-center medium-spinner mb-4 col-lg-12 mx-auto">
                                        <LoadingComponent />
                                    </div>
                                )}

                                {message !== "" && (
                                    <div className="form-group col-lg-12 mx-auto mb-0">
                                        <div className="alert alert-danger text-center" role="alert">
                                            {message}
                                        </div>
                                    </div>
                                )}

                                {/* Submit Button */}
                                <div className="form-group col-lg-12 mx-auto mb-2">
                                    <input type="submit" className="btn btn-primary btn-block py-2" value="Přihlásit se"/>
                                </div>

                                {/* Already Registered */}
                                <div className="text-center w-100">
                                    <p className="text-muted font-weight-bold mb-0">Nemáte ještě účet? <Link className="text-primary ml-2" to={"/register"}>Zaregistrovat se</Link></p>
                                    <p className="text-muted font-weight-bold">Zapomenuté heslo? <Link className="text-primary ml-2" to={"/renew"}>Obnovit heslo</Link></p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;