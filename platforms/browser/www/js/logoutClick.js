/*
 * 
 * 
 */
function logout() {
	localStorage.removeItem("user");
	localStorage.removeItem("pass");
	window.location.replace("index.html");
}