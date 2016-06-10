var index = 1;

$(".hoverButton").click(function(){
	if($(this).attr("id") == "right"){
		if(index < 3){
			index++;
		}
		else
		{
			index = 1;
		}
	}else{
		if(index > 1){
			index--;
		}
		else
		{
			index = 3;
		}
	}
	$.ajax({ 
		success: function() {
			var str = './images/meImages/cwells' + index + '.png';
			$('#pimg').attr("src", str);

		},
		error: function(err) {
			alert("I'm sorry, something went wrong");
		}

	});
});