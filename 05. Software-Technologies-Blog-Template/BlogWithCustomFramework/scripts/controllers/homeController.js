class HomeController {
    constructor(homeView, requester, baseUrl, appKey){
        this._homeView = homeView;
        this._requester = requester;
        this._appKey = appKey;
        this._baseServiceUrl = baseUrl + "/appdata/" + appKey + "/blog";
    }

    showGuestPage(){
        let _that = this;
        let recentPosts = [];

        this._requester.get(this._baseServiceUrl, function(response){
            showPopup('success', "Posts loaded");

            let currentID = 1;

          response.sort(function (elem1, elem2) {
                let date1 = new Date(elem1._kmd.etc);
                let date2 = new Date(elem2._kmd.etc);
                return date2-date1;

            });

            for(let i = 0; i<response.length && i< 5; i++){
                response[i].postID=currentID;
                currentID++;
                recentPosts.push(response[i]);
            }

            _that._homeView.showGuestPage(response, recentPosts);


        }, function (response) {
            showPopup('error', "Problem loading posts")
    })
    }

    showUserPage(){
        let _that = this;
        let recentPosts = [];

        this._requester.get(this._baseServiceUrl, function(response){
            showPopup('success', "Posts loaded");

            let currentID = 1;

            response.sort(function (elem1, elem2) {
                let date1 = new Date(elem1._kmd.etc);
                let date2 = new Date(elem2._kmd.etc);
                return date2-date1;

            });

            for(let i = 0; i<response.length && i< 5; i++){
                response[i].postID=currentID;
                currentID++;
                recentPosts.push(response[i]);
            }

            _that._homeView.showUserPage(response, recentPosts);


        }, function (response) {
            showPopup('error', "Problem loading posts")
        })
    }
}

