function loadArticle(index) {
	$.ajax({ url: './articles/article' + index + '.html',
			success: function(str) {
				$("#mainContent").html(str);
				DISQUS.reset({
					reload: true,
					config: function () {  
					this.page.identifier = "article" + index;  
					this.page.url = "http://cskingmartin.github.io/cwellsWebsite/news.html#!article" + index;
				  }
				});
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

