class HomeView{
    constructor(mainContentSelector, wrapperSelector){
    this._mainContentSelector = mainContentSelector;
        this._wrapperSelector = wrapperSelector;
    }

    showGuestPage(mainData, sidebarData ){
        let _that = this;
         $.get('templates/welcome-guest.html', function (template) {
            let renderedTemplate = Mustache.render(template, sidebarData);
            $(_that._wrapperSelector).html(renderedTemplate);

            $.get('templates/posts.html', function (template) {
                let blogPosts = {
                    blogPosts:mainData
                };

                let renderedPosts = Mustache.render(template, blogPosts);
                $('.articles').html(renderedPosts);
            });

           $.get('templates/recent-posts.html', function (template) {
                let recentPosts = {
                    recentPosts:sidebarData
                };
                console.log(recentPosts);

                let renderedPosts = Mustache.render(template, recentPosts);
                $('.recent-posts').html(renderedPosts);
            })
        });

    }
    
    showUserPage(mainData, sidebarData){
        let _that = this;
        $.get('templates/welcome-user.html', function (template) {
            let renderedTemplate = Mustache.render(template, sidebarData);
            $(_that._wrapperSelector).html(renderedTemplate);

            $.get('templates/posts.html', function (template) {
                let blogPosts = {
                    blogPosts:mainData
                };

                let renderedPosts = Mustache.render(template, blogPosts);
                $('.articles').html(renderedPosts);
            });

            $.get('templates/recent-posts.html', function (template) {
                let recentPosts = {
                    recentPosts:sidebarData
                };
                console.log(recentPosts);

                let renderedPosts = Mustache.render(template, recentPosts);
                $('.recent-posts').html(renderedPosts);
            })
        });

    }
    
}
