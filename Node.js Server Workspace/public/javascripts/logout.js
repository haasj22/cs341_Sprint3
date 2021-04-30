//File initialized by Matthew Groh
$("logOutButton").click(function(){
	//clear username and password upon clicking button
	//NOTE: largely a short-term solution, could be potential security risk
	sessionStorage.setItem("username","");
	sessionStorage.setItem("password","");
});