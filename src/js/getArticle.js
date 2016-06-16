$(function() {
    $(".button").click(function(){
        var id = $(this).attr('aValue');
        $.ajax({ url: './articles/article' + id + '.html',
            success: function(str) {
                //alert(str);
                $("#mainContent").html(str);
            },
            error: function(err) {
                alert("I'm sorry, that article doesn't exist!");
            }
        });
    });
});
