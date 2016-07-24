class PostController{
    constructor(postView, requester, baseUrl, appKey){
        this._postView = postView;
        this._requester = requester;
        this._appKey = appKey;
        this._baseServiceUrl = baseUrl + "/appdata/" + appKey + "/blog";
    }

    showCreatePostPage(fullName, isLoggedIn){
        this._postView.showCreatePostPage(fullName, isLoggedIn);
    }

    createNewPost(data){
        if(data.title.length < 1){
        showPopup('error', "The title should be at least 1 symbols long");
        return;
    }
        if(data.content.length < 1){
            showPopup('error', "The content should be at least 1 symbols long");
            return;
        }

        this._requester.post(this._baseServiceUrl, data, function (responseData) {
            showPopup('success', 'Post created');
            redirectUrl('#/');
        }, function (responseData) {
            showPopup('error', 'Problem creating post');
        })
    }
}