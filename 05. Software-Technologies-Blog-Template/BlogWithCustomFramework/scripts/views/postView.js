class PostView{
    constructor(mainContentSelector, wrapperSelector){
        this._mainContentSelector = mainContentSelector;
        this._wrapperSelector = wrapperSelector;
    }

    showCreatePostPage(fullName,isLoggedIn){
        let _that = this;
        let requestTemplate = isLoggedIn ? 'templates/form-user.html' : 'templates/form-guest.html';

        $.get(requestTemplate, function (template) {
            let renderedTemplate = Mustache.render(template, null);

            $(_that._wrapperSelector).html(renderedTemplate);

            $.get('templates/create-post.html', function (template) {
                let renderedCreatePost = Mustache.render(template, null);
                $(_that._mainContentSelector).html(renderedCreatePost);
                $('#author').val(fullName);
                $('#create-new-post-request-button').on('click', function (ev) {
                    let title = $('#title').val();
                    let content = $('#content').val();
                    let date = moment().format("MMMM Do YYYY");
                    let author = fullName;


                    let data = {
                        title:title,
                        content:content,
                        author:author,
                        date:date
                    };                    
                    triggerEvent('createPost', data);
                })
            })
        });
    }
}
