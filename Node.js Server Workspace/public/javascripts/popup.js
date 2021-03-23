// Authors: Matthew Groh
// Date updated: 3/22/2021

$(document).ready(function(){
    // Display popup upon page loading
    var popup = document.getElementById('login_popup');
    popup.style.display = "block";

    // Close popup when 'x' button is clicked
    var close_button = document.getElementById('close_button');
	close_button.onclick = function() {
		popup.style.display = "none";
	}

	// Close popup when clicking anywhere outside it
	window.onclick = function(event) {
		if(event.target == popup) {
			popup.style.display = "none";
		}
	}

	// Go to login screen if "Yes" is selected
	var button_yes = document.getElementById('login_true');
	button_yes.addEventListener('click', function() {
		console.log("Entered login from popup");
        document.location.href= "login.html";
    });

    // Close popup if "No" is selected
    var button_no = document.getElementById('login_false');
    button_no.onclick = function() {
    	popup.style.display = "none";
    }
});