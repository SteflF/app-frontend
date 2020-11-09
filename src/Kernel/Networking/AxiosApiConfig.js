import axios from 'axios';
import Session from "../Services/SessionService";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2"

// Create custom instance.
const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

// Track API requests on DEBUG app.
if(process.env.NODE_ENV === 'development')
{
    instance.interceptors.request.use(request =>
    {
        console.log('Request', request)
        return request;
    })

    instance.interceptors.response.use(response =>
    {
        console.log('Response:', response)
        return response;
    })
}

// Add a 401 response interceptor.
instance.interceptors.response.use(function(response)
{
    return response;
}, function(error)
{
    Session.logout();
    withReactContent(Swal).fire({
        title: "Relace vypršela",
        text: "Vaše relace již vypršela. Chcete nyní přesměrovat na přihlašovací obrazovku?",
        icon: "error",
        allowOutsideClick: false,
        allowEscapeKey: false,
        showCancelButton: true,
        confirmButtonColor: "#49a942",
        confirmButtonText: "Znovu přihlásit",
        cancelButtonText: "Hlavní strana",
        cancelButtonColor: "#dd6b55"
    }).then((result) =>
    {
        if(result.value)
            window.location = "/login"
        else
            window.location = "/";
    })
    return Promise.resolve();
});

// Setup authentication headers.
export function setupToken()
{
    instance.defaults.headers.common['Authorization'] = Session.getBearerToken();
}

// Get instance with authentication headers
export function GetInstanceWithToken()
{
    setupToken();
    return instance;
}

export default instance;