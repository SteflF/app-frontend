import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import LoadingComponent from "../Kernel/Components/LoadingComponent";
import AuthService from "../Kernel/Services/AuthenticationService";

const Register = (props) =>
{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [isMounted, setMounted] = useState(false);

    useEffect(() => {
        document.title = 'Registrace';
        setMounted(true);
        return () => {setMounted(false)};
    }, []);

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        isMounted && setMessage("");

        if (password.length <= 3) {
            isMounted && setMessage("Heslo musí obsahovat více 6 znaků!");
            return;
        }
        if (password !== passwordAgain) {
            isMounted && setMessage("Hesla se musí shodovat!");
            return;
        }
        isMounted && setLoading(true);

        AuthService.register(username, password).then(res =>{
            if (res.data.status === 200) {
                props.history.push("/login");
            } else {
                if (res.data.status_key === "ALREADY-EXISTS") {
                    isMounted && setMessage("Zvolené uživatelské jméno nelze registrovat!");
                } else {
                    isMounted && setMessage("V průběhu registrace se vyskytla chyba!");
                }
            }
            isMounted && setLoading(false);
        });
    };

    return (
        <div className="register">
            <div className="container">
                <div className="row py-5 mt-4 align-items-center">

                    {/* Registeration Form */}
                    <div className="col-md-7 col-lg-6 ml-auto">
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="row">
                                <h1 className="ml-3 mb-4">Založte si nový účet</h1>
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

                                <div className="input-group col-lg-6 mb-4">
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

                                <div className="input-group col-lg-6 mb-4">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-white px-4 border-md border-right-0">
                                            <i className="fad fa-lock-alt text-muted"/>
                                        </span>
                                    </div>
                                    <input type="password" required placeholder="Heslo znovu"
                                           className="form-control bg-white border-left-0 border-md"
                                           onChange={e => isMounted && setPasswordAgain(e.target.value)}
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
                                    <input type="submit" className="btn btn-primary btn-block py-2" value="Zaregistrovat se"/>
                                </div>

                                {/* Already Registered */}
                                <div className="text-center w-100">
                                    <p className="text-muted font-weight-bold">Máte již účet? <Link className="text-primary ml-2" to={"/login"}>Přihlašte
                                        se</Link></p>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;