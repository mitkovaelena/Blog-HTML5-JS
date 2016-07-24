class UserController{
    constructor(userView, requester, baseUrl, appKey){
        this._userView = userView;
        this._requester = requester;
        this._appKey = appKey;
        this._baseServiceUrl = baseUrl + "/user/" + appKey + "/"; //TODO
    }

    showLoginPage(isLoggedIn){
        this._userView.showLoginPage(isLoggedIn);
    }

    showRegisterPage(isLoggedIn){
        this._userView.showRegisterPage(isLoggedIn);
    }

    register(data){
        if(data.username.length < 5){
            showPopup('error', "The username should be at least 5 symbols long");
            return;
        }
        if(data.fullName.length < 5){
            showPopup('error', "The full name should be at least 5 symbols long");
            return;
        }
        if(data.password != data.confirmPassword){
            showPopup('error', "Passwords don't match");
            return;
        }
        if(data.password.length < 5){
            showPopup('error', "The password should be at least 5 symbols long");
            return;
        }
        delete data['confirmPassword']
        this._requester.post(this._baseServiceUrl, data,
            function successCallback(response)
         {
            showPopup('success', "Registration completed");
             redirectUrl('#/login')
        }, function errorCallback(response) {
            showPopup('error', "Problem registration")
            })
    }


    login(data){
        let loginUrl = this._baseServiceUrl + "login"
       this._requester.post(loginUrl, data,
           function successCallback(response){
               sessionStorage.setItem('username', response.username)
               sessionStorage.setItem('_authToken', response._kmd.authtoken)
               sessionStorage.setItem('fullName', response.fullName)
           showPopup('success', "Login completed");
           redirectUrl('#/')
       }, function errorCallback(response) {
           showPopup('error', "Problem login")
       })
    }
    
    logout(){
        sessionStorage.clear();
        redirectUrl('#/')

    }
}
