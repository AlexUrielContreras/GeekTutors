import decode from 'jwt-decode';

class AuthService {
    // retrieve data saved in token 
    getProfile(){
        return decode(this.getToken())
    }

    // check if the user is still logged in 
    loggedIn() {
        //check if there is a saved toke and ist still valid 
        const token = this.getToken();
        // user type coersion to check if token is not undefined and the token is not expired 
        return !!token && !this.isTokenExpired(token)
    }
    
    // check if the token has expired 
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000){
                return true;
            } else {
                return false
            }
        } catch (err){ 
            return false
        }
    }

    // retrieve token from localStorage
    getToken() {
        // Retrive the user tokrn from local storage
        return localStorage.getItem('id_token');
    }

    //set token to localStorage and reload page to homepage 
    login(idToken){
        // save user token to localstorage
        localStorage.setItem('id_token', idToken);

        window.location.assign('/')
    }

    // clear token form localStoage and force to logout with reload 
    logout() {
        //clear token and profile data form localstorage
        localStorage.removeItem('id_token');
        //this will reload the page and reset the state of the application 
        window.location.assign('/')
    }
}

export default new AuthService();