import Session from "./SessionService";

const PREVIOUS_PAGE_KEY = "PREVIOUS_PAGE"

export function setLastRoute(path)
{
    localStorage.setItem(PREVIOUS_PAGE_KEY, path);
}

export function getLastRoute()
{
    let path = localStorage.getItem(PREVIOUS_PAGE_KEY);

    if(!path)
        return Session.isLoggedIn() ? "/login" : "/";

    localStorage.removeItem(PREVIOUS_PAGE_KEY);
    return path;
}