function saveText(){
	var editElem = document.getElementById(document.querySelector(".info-text").id);
	var userVersion = editElem.innerHTML;
	window.localStorage.userEdits = userVersion;
	alert("Text saved.");
}