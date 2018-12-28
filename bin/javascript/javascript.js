// ####################################################################
// JavaScript functions
// For kernelultras 0.0.1
// (D.M.Y) 31.07.2011
// Author: Mário Chorváth - Bedna
// ####################################################################
// ....................................................................
// Focus commandline
// ....................................................................
console.log ("You are an hacker!");
function getfocus () {

	//~ window.scroll(0,1000000);

	if (document.getElementById ("shell") != null) {
		document.getElementById ("shell").focus();
	}
	if (document.getElementById ("data") != null) {
		document.getElementById ("data").focus();
	}
}

document.addEventListener ('DOMContentLoaded', function () {
  document.querySelector ('body');
  getfocus ();
});
