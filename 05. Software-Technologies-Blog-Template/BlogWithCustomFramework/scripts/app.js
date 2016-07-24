(function () {

    
    // Create your own kinvey application

    let baseUrl = "https://baas.kinvey.com";
    let appKey = "kid_HJgg04gU";
    let appSecret = "5b3ca24e3ad842a5a1c5ccb7d768f6cf";
    let _guestCredentials = "27233632-ee5b-4372-86f1-136be1976081.Y3VYFazesCILdmvECGqMYdBpss7MApNlEg+i+HSwPok=";
    // authToken na guesta


    let authService = new AuthorizationService(baseUrl, appKey, appSecret, _guestCredentials); //vmesto authToken
    let requester = new Requester(authService); // makest REST requests

    authService.initAuthorizationType("Kinvey")

    let selector = ".wrapper";
    let mainContentSelector = ".main-content";

    let homeView = new HomeView(mainContentSelector,selector);
    let homeController = new HomeController(homeView, requester, baseUrl, appKey);

    let userView = new UserView(mainContentSelector,selector);
    let userController = new UserController(userView, requester, baseUrl, appKey);

    let postView = new PostView(mainContentSelector,selector);
    let postController = new PostController(postView, requester, baseUrl, appKey);

    initEventServices();

    onRoute("#/", function () {
        // Check if user is logged in and if its not show the guest page, otherwise show the user page...
        if(authService.isLoggedIn()){
                homeController.showUserPage();
        }
        else {
            homeController.showGuestPage();
        }
    });

    onRoute("#/post-:id", function () {
        // Create a redirect to one of the recent posts...
       let top = $("post-" +this.params['id']).position().top;
        $(window).scrollTop(top);

    });

    onRoute("#/login", function () {
        // Show the login page...
        userController.showLoginPage(authService.isLoggedIn());
    });

    onRoute("#/register", function () {
        // Show the register page...
        userController.showRegisterPage(authService.isLoggedIn());
    });

    onRoute("#/logout", function () {
        // Logout the current user...
       userController.logout();
    });

    onRoute('#/posts/create', function () {
        // Show the new post page...
        let fullName = sessionStorage.getItem("fullName");
        postController.showCreatePostPage(fullName, authService.isLoggedIn());
    });

    bindEventHandler('login', function (ev, data) {
        // Login the user...
        userController.login(data);
    });

    bindEventHandler('register', function (ev, data) {
        // Register a new user...
        userController.register(data);
    });

    bindEventHandler('createPost', function (ev, data) {
        // Create a new post...
        postController.createNewPost(data);
    });

    run('#/');
})();
