class SessionService
{
    TOKEN_KEY = "AUTH_TOKEN";
    TOKEN_EXPIRATION_KEY = "AUTH_TOKEN_EXPIRATION";
    USER_USERNAME_KEY = "LOGGED_USER_USERNAME";

    getToken()
    {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    getTokenExpiration()
    {
        return localStorage.getItem(this.TOKEN_EXPIRATION_KEY);
    }

    getUsername()
    {
        return localStorage.getItem(this.USER_USERNAME_KEY);
    }

    getBearerToken()
    {
        const token = this.getToken()
        if(token === undefined)
        {
            return undefined
        }

        return "Bearer " + token;
    }

    storeAuthData(token, username)
    {
        const extracted = this.extractToken(token);

        localStorage.setItem(this.TOKEN_KEY, token.trim());
        localStorage.setItem(this.TOKEN_EXPIRATION_KEY, extracted.exp);
        localStorage.setItem(this.USER_USERNAME_KEY, username.trim());
    }

    removeAuthData()
    {
        localStorage.clear();
        sessionStorage.clear();
    }

    isLoggedIn()
    {
        if(this.isStoredTokenExpired()) {
            this.removeAuthData();
            return false;
        }
        return !!this.getToken();
    }

    isStoredTokenExpired()
    {
        let expiration = this.getTokenExpiration();
        if(expiration) {
            return (expiration <= (new Date().getTime()));
        }
        return false;
    }

    logout()
    {
        this.removeAuthData();
    }

    extractToken(token)
    {
        try
        {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            var data = JSON.parse(window.atob(base64));
            data.exp *= 1000;
            data.iat *= 1000;
            return data;
        } catch(error)
        {
            console.log(error)
        }
        return null;
    }
}

export default new SessionService();