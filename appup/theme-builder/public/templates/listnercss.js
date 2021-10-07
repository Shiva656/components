function setDoccsstoIframe (evt) {
	var message;
	if (evt.origin !== "http://localhost:8080") {
		message = "You are not worthy";
	}
	else {
		message = "I got " + evt.data + " from " + evt.origin;
    }
    
    // document.getElementById("received-message").innerHTML = message;
    var createStyleElement = document.createElement("style");
    createStyleElement.id = "generated_CSS";
    createStyleElement.textContent = evt.data;
    document.getElementsByTagName("head")[0].appendChild(createStyleElement);
}

if (window.addEventListener) {
	// For standards-compliant web browsers
	window.addEventListener("message", setDoccsstoIframe, false);
}
else {
	window.attachEvent("onmessage", setDoccsstoIframe);
}
