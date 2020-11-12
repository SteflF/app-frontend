import axios from "../Networking/AxiosApiConfig"

class SessionService
{
    login(username, password) {
        return axios.post("/api/security/authenticate", {
            username: username,
            password: password
        });
    }

    recoverPasswd(username, email) {
        return axios.post("/api/security/recoverPassword", {
            username: username,
            email: email
        });
    }

    register(username, password) {
        return axios.post("/api/security/registerUser", {
            username: username,
            password: password
        });
    }
}

export default new SessionService();