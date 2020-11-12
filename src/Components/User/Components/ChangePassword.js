import * as React from "react";
import {AccountController_ChangePassword} from "../../../ApiClient/routes";
import http from "../../../Kernel/Networking/HttpService";
import {toast, ToastContainer} from "react-toastify";
import {Helmet} from "react-helmet";
import {setupToken} from "../../../Kernel/Networking/AxiosApiConfig";

class ChangePassword extends React.Component {
    state = {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        let data = {
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword,
            confirmNewPassword: this.state.confirmNewPassword
        }

        setupToken();
        const result = await http.put(AccountController_ChangePassword, data);

        if (result.data.status === 200) {
            toast.success('Password change successful!');
            this.setState({oldPassword: '', newPassword: '', confirmNewPassword: ''})
        }else {
            toast.error('Something went wrong!');
            this.setState({oldPassword: '', newPassword: '', confirmNewPassword: ''})
        }
    }

    render() {
        return(
            <React.Fragment>
                <Helmet>
                    <title>Password change</title>
                </Helmet>
                <ToastContainer/>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h2 className="text-light text-center">Password change</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3"></div>
                        <div className="col-sm-6 text-light">
                            <form onSubmit={this.handleSubmit} className="form-check">
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input name="oldPassword" type="password" className="form-control" placeholder="Old password" value={this.state.oldPassword} onChange={this.onChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input name="newPassword" type="password" className="form-control" placeholder="New password" value={this.state.newPassword} onChange={this.onChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input name="confirmNewPassword" type="password" className="form-control" placeholder="Confirm password" value={this.state.confirmNewPassword} onChange={this.onChange} required />
                                </div>
                                <button type="submit" className="btn btn-primary">Save</button>
                            </form>
                        </div>
                        <div className="col-3"></div>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}

export default ChangePassword;