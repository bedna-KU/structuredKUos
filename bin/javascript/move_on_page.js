// ###########################################################################
// Aaron web operating system
// https://github.com/bedna-KU/Aaron
// ---------------------------------------------------------------------------
// Move on page and focus command line
// JavaScript functions
// Command for kernelultras 0.0.1
// (D.M.Y) 31.07.2011
// Author: Mário Chorváth - Bedna
// License GPLv2: GNU GPL version 2 https://www.gnu.org/licenses/gpl-2.0.html.
// This is free software: you are free to change and redistribute it.
// There is NO WARRANTY, to the extent permitted by law.
// ###########################################################################

// ====================================================================
// Add event listener on keyup
// ====================================================================
document.body.addEventListener("keyup", onkeyup);

// ====================================================================
// On key up test "shell" is in viewport?
// ====================================================================
function onkeyup (event) {
	if (document.getElementById("shell") && !document.getElementById("clipboard")) {
		if (!isElementOutViewport (shell) && event.target.tagName.toLowerCase() !== 'input' && event.target.tagName.toLowerCase() !== 'textarea') {
			shell.focus ();
		}
	}
	if (document.getElementById("content") && event.keyCode != 9) {
		if (!isElementOutViewport (form.content)) {
			form.content.focus ();
		}
	}
}

// ====================================================================
// Test element if is out of viewport
// ====================================================================
function isElementOutViewport (el) {
    var rect = el.getBoundingClientRect();
    return rect.bottom < 0 || rect.right < 0 || rect.left > window.innerWidth || rect.top > window.innerHeight;
}
