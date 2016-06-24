

function loadArticle(index) {
    $.ajax({ url: './articles/article' + index + '.html',
            success: function(str) {
                $("#mainContent").html(str);
            },
            error: function(err) {
                alert("I'm sorry, that article doesn't exist!");
            }
        });

}

$(function() {
    $(window).on('hashchange', function() {
        var index = location.hash;
        var i = index.slice(-1);
        //alert(i);

        loadArticle(i);
    });
});

