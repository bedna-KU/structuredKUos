// ###########################################################################
// Aaron web operating system
// https://github.com/bedna-KU/Aaron
// ---------------------------------------------------------------------------
// Autocomplete for commandline
// JavaScript control elements
// Command for kernelultras 0.0.1
// (D.M.Y) 31.07.2011
// Author: Mário Chorváth - Bedna
// License GPLv2: GNU GPL version 2 https://www.gnu.org/licenses/gpl-2.0.html.
// This is free software: you are free to change and redistribute it.
// There is NO WARRANTY, to the extent permitted by law.
// ###########################################################################

window.addEventListener ('click', function (evt) {
    if (evt.detail === 3) {
        // Element with keys
		keys = document.getElementById ("keys");
		// If console is empty
		if (keys.style.visibility == 'hidden') {
			keys.style.visibility = 'visible';
		}
		// If console is do not empty
		else {
			keys.style.visibility = 'hidden';
		}
    }
});

if (document.getElementById ("keyUp")) {
	document.getElementById ("keyUp").addEventListener('click', keyUp);
}

if (document.getElementById ("keyDown")) {
	document.getElementById ("keyDown").addEventListener('click', keyDown);
}

if (document.getElementById ("keyTab")) {
	document.getElementById ("keyTab").addEventListener('click', keyTab);
}

function keyUp () {
	var e = {keyCode: 38};
	document.getElementById("shell").focus();
	keyHandler (e);
}

function keyDown () {
	var e = {keyCode: 40};
	document.getElementById("shell").focus();
	keyHandler (e);
}

function keyTab () {
	var e = {keyCode: 9};
	document.getElementById("shell").focus();
	keyHandlerAuto (e);
}
