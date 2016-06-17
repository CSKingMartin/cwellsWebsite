		var tf = "0";

		$(".expButton").click(function(){

			console.log("onClick");

			$(".expMenu").toggleClass("expMenu-exp");


			if (tf == "0") {

				$(".expButton").html("<h2>&#10006</h2>");

				tf = "1";
			} 
			else {

				$(".expButton").html("<h1>&#8942</h1>");

				tf = "0";
			}
	});