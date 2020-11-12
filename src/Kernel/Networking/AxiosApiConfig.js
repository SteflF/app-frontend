import axios from 'axios';
import Session from "../Services/SessionService";

// Create custom instance.
const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

// Alter defaults after instance has been created
// instance.defaults.headers.common['Authorization'] = Session.getBearerToken();

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

    // PreviousPage.setLastRoute(url);
    // window.location = "/login"
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