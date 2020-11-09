import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import LoadingComponent from "../Kernel/Components/LoadingComponent";
import AuthService from "../Kernel/Services/AuthenticationService";

const RecoverPassword = (props) =>
{
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        document.title = 'Zapomenuté heslo';
    })

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        setMessage("");
        setLoading(true);
        AuthService.recoverPasswd(username, email).then(res =>{
            if (res.data.status === 200) {
                setSuccess("<b>Žádost byla odeslána!</b> Vyčkejte kontaktu od administrátora.");
            } else {
                setMessage("Žádost nebylo možné vyřídit!");
            }
            setLoading(false);
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
                                <h1 className="ml-3 mb-4">Zapomenuté heslo</h1>
                            </div>
                            <div className="row">

                                {success === "" && (
                                    <React.Fragment>
                                        <div className="input-group col-lg-12 mb-4">
                                            <div className="input-group-prepend">
                                        <span className="input-group-text bg-white px-4 border-md border-right-0">
                                            <i className="fas fa-id-card-alt text-muted"/>
                                        </span>
                                            </div>
                                            <input type="text" required placeholder="Uživatelské jméno"
                                                   className="form-control bg-white border-left-0 border-md"
                                                   onChange={e => setUsername(e.target.value)}
                                            />
                                        </div>

                                        <div className="input-group col-lg-12 mb-4">
                                            <div className="input-group-prepend">
                                        <span className="input-group-text bg-white px-4 border-md border-right-0">
                                            <i className="fas fa-id-card-alt text-muted"/>
                                        </span>
                                            </div>
                                            <input type="email" required placeholder="Email"
                                                   className="form-control bg-white border-left-0 border-md"
                                                   onChange={e => setEmail(e.target.value)}
                                            />
                                        </div>

                                        {message !== "" && (
                                            <div className="form-group col-lg-12 mx-auto mb-0">
                                                <div className="alert alert-danger text-center" role="alert">
                                                    {message}
                                                </div>
                                            </div>
                                        )}

                                        {loading === true && (
                                            <div className="form-group text-center medium-spinner mb-4 col-lg-12 mx-auto">
                                                <LoadingComponent />
                                            </div>
                                        )}

                                        <div className="form-group col-lg-12 mx-auto mb-2">
                                            <input type="submit" className="btn btn-primary btn-block py-2" value="Podat žádost o obnovu hesla"/>
                                        </div>
                                    </React.Fragment>
                                )}

                                {success !== "" && (
                                    <div className="form-group col-lg-12 mx-auto mb-0">
                                        <div className="alert alert-success text-center" role="alert" dangerouslySetInnerHTML={{__html: success}} />
                                    </div>
                                )}

                                {/* Already Registered */}
                                <div className="text-center w-100">
                                    <p className="text-muted font-weight-bold mb-0">Vzpomněl jste si na heslo? <Link className="text-primary ml-2" to={"/login"}>Přihlásit se</Link></p>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecoverPassword;