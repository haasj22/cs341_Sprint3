// Authors: Matthew Groh
// Date updated: 3/24/2021

$(document).ready(function(){

	let shouldVerifyLogin = false;

	// redirect users who are not logged in if they try to access admin or staff pages
	if (window.location.href.toLowerCase().includes("admin_catalog") || window.location.href.toLowerCase().includes("staff_catalog"))
	{
		if (!sessionStorage.getItem("username") || !sessionStorage.getItem("password"))
		{
			window.location = "index.html";
		}
		else
		{
			shouldVerifyLogin = true;
		}		
	}
	else if (window.location.href.toLowerCase().includes("admin_individual_page") || window.location.href.toLowerCase().includes("staff_individual_page"))
	{
		if (!sessionStorage.getItem("username") || !sessionStorage.getItem("password"))
		{
			let idSubstring = window.location.href.split('?');
			window.location = "VIEWER_individual_page.html?" + idSubstring[idSubstring.length-1];
		}
		else
		{
			shouldVerifyLogin = true;
		}	
	}
	else if (window.location.href.toLowerCase().includes("staff_requests_page"))
	{
		if (!sessionStorage.getItem("username") || !sessionStorage.getItem("password"))
		{
			// redirect to viewer catalog since viewer is not allowed to view requests
			window.location = "index.html";
		}
		else
		{
			shouldVerifyLogin = true;
		}
	}
	else {
		console.log("on a viewer page");
	}
	
	
	// if we did not redirect the user, verify that the current username and password are valid
	if (shouldVerifyLogin) 
	{
		console.log("verifying that username and password are valid");
		let obj = {"emailaddress": "", "password": "","url": window.location.href};

		if (sessionStorage.getItem("username") && sessionStorage.getItem("password"))
		{
			obj.emailaddress = sessionStorage.getItem("username");
			obj.password = sessionStorage.getItem("password");
		}
		// this post request will redirect the user if they are not allowed to be on the current page
		$.post('/verifyLogin',obj,function(data,status){
			if (status == "error")
			{
				console.log("Error sending post request");
			}
			else 
			{
				if (!window.location.href.includes(data.page)){
					window.location = data.page;
				}
			}
		});
	}
	else
	{
		console.log("no need to verify login");

	}
	




    // Close popup when 'x' button is clicked
    var close_button = document.getElementById('close_button');
	if (close_button != null) //if it's null, we're aren't on a page that has the popup html code
	{

		// Display popup upon page loading
		//only display the popup if the user has not already been asked to login
		var popup = document.getElementById('login_popup');
		if (!checkLoggedIn()){
			//if you haven't addressed the popup yet, display the popup
			popup.style.display = "block";
		}

		close_button.onclick = function() {
			popup.style.display = "none";
			setCookie("askLoggedIn", "Y", 1);
		}

		// Close popup when clicking anywhere outside it
		window.onclick = function(event) {
			if(event.target == popup) {
				popup.style.display = "none";
				setCookie("askLoggedIn", "Y", 1);
			}
		}

		// Go to login screen if "Yes" is selected
		var button_yes = document.getElementById('login_true');
		button_yes.addEventListener('click', function() {
			console.log("Entered login from popup");
			document.location.href= "login.html";
			setCookie("askLoggedIn", "Y", 1);
		});

		// Close popup if "No" is selected
		var button_no = document.getElementById('login_false');
		button_no.onclick = function() {
			popup.style.display = "none";
			setCookie("askLoggedIn", "Y", 1);
		}

		//cookie tutorial from W3Schools
		//https://www.w3schools.com/js/js_cookies.asp 

		//a function to create a new cookie
		function setCookie(cname, cvalue, exdays) {
			var d = new Date();
			d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
			var expires = "expires="+d.toUTCString();
			document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
		}
		
		//a function to get a cookie by name
		function getCookie(cname) {
			var name = cname + "=";
			var ca = document.cookie.split(';');
			for(var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') {
				c = c.substring(1);
				}
				if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
				}
			}
			return "";
		}
		
		//a function to check if the user has logged in before
		//return boolean
		function checkLoggedIn() {
			var askLoggedIn = getCookie("askLoggedIn");
			if (askLoggedIn != "") {
				return true;
			} else {
				return false;
			}
		}
	}
});