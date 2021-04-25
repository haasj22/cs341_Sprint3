// Authors: Matthew Groh
// Date updated: 3/24/2021

$(document).ready(function(){

	// if user has not logged in, redirect them to a viewer verision of page
	if (window.location.href.includes("ADMIN_catalog") || window.location.href.includes("STAFF_catalog"))
	{
		if (!sessionStorage.getItem("username") || !sessionStorage.getItem("password"))
		{
			window.location = "http://localhost:3000/index.html";
		}
	}
	else if (window.location.href.includes("ADMIN_Individual_Page") || window.location.href.includes("STAFF_Individual_Page"))
	{
		if (!sessionStorage.getItem("username") || !sessionStorage.getItem("password"))
		{
			window.location = "http://localhost:3000/VIEWER_individual_page.html";
		}		
	}
	else if (window.location.href.includes("STAFF_requests_page"))
	{
		if (!sessionStorage.getItem("username") || !sessionStorage.getItem("password"))
		{
			// redirect to viewer catalog since viewer is not allowed to view requests
			window.location = "http://localhost:3000/index.html";
		}
	}

    // Display popup upon page loading
	//only display the popup if the user has not already been asked to login
    var popup = document.getElementById('login_popup');
	if (!checkLoggedIn()){
		//if you haven't addressed the popup yet, display the popup
		popup.style.display = "block";
	}

    // Close popup when 'x' button is clicked
    var close_button = document.getElementById('close_button');
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
});