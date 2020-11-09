import axios from "../Networking/AxiosApiConfig"

class SessionService
{
    login(username, password) {
        return axios.post("/security/authenticate", {
            username: username,
            password: password
        });
    }

    recoverPasswd(username, email) {
        return axios.post("/security/recoverPassword", {
            username: username,
            email: email
        });
    }

    register(username, password) {
        return axios.post("/security/registerUser", {
            username: username,
            password: password
        });
    }
}

export default new SessionService();