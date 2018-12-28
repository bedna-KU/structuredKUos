// ###########################################################################
// Aaron web operating system
// https://github.com/bedna-KU/Aaron
// ---------------------------------------------------------------------------
// Return history from commandline
// JavaScript functions
// Command for kernelultras 0.0.1
// (D.M.Y) 31.07.2011
// Author: Mário Chorváth - Bedna
// License GPLv2: GNU GPL version 2 https://www.gnu.org/licenses/gpl-2.0.html.
// This is free software: you are free to change and redistribute it.
// There is NO WARRANTY, to the extent permitted by law.
// ###########################################################################

// Variables
var shellHistory = [];
var myInput = document.getElementById ("shell");
var myInputArea = document.getElementById ("content");

// Set SHELL history length
if (typeof shellHistory == 'undefined' || shellHistory == null) {
	shellHistoryCount = "0";
	shellHistory = " ";
}
else {
	shellHistoryCount = shellHistory.length;
}

// Set SHELL history on last command
shellHistoryCurrent = shellHistoryCount;

// ====================================================================
// Add event listener on keypressed
// ====================================================================
// If command line
if (myInput) {
	if (myInput.addEventListener) {
		myInput.addEventListener ('keydown',this.keyHandler,false);
	} else if (myInput.attachEvent) {
		myInput.attachEvent ('onkeydown',this.keyHandler); /* damn IE hack */
	}
}
// If textarea
if (myInputArea) {
	if (myInputArea.addEventListener) {
		myInputArea.addEventListener ('keydown',this.keyHandler,false);
	} else if (myInputArea.attachEvent) {
		myInputArea.attachEvent ('onkeydown',this.keyHandler); /* damn IE hack */
	}
}

function decodeEntities(s){
    var str, temp= document.createElement('p');
    temp.innerHTML= s;
    str= temp.textContent || temp.innerText;
    temp=null;
    return str;
}

// ====================================================================
// Key handler
// ====================================================================
function keyHandler (e) {
	// Set SHELL history length
	if (typeof shellHistory == 'undefined' || shellHistory == null) {
		shellHistoryCount = "0";
		shellHistory = " ";
	}
	else {
		shellHistoryCount = shellHistory.length;
	}
	// Keycode for Page Up
	var PGUP = 33;
	// Keycode for Page Down
	var PGDN = 34;
	// Keycode for Arrow UP
	var ARRUP = 38;
	// Keycode for Arrow Down
	var ARRDN = 40;
	if (document.getElementById("shell")) {
		var sh = document.getElementById("shell");
		// If pressed Page Up or Page Down unfocus "shell" for scroll on page
		if (e.keyCode == PGUP || e.keyCode == PGDN) {
			if (document.getElementById("shell")) {
				sh.blur ();
			}
			if (document.getElementById("content")) {
				form.content.blur ();
			}
		}
		// Shell history - Arrow UP
		else if (e.keyCode == ARRUP && document.getElementById("shell")) {
			shellHistoryCurrent--;
			// If shell history is lower then 0
			if (shellHistoryCurrent < 0) {shellHistoryCurrent = 0;}
			// Output to comandline
			sh.value = decodeEntities (shellHistory[shellHistoryCurrent]) + " ";
			sh.selectionStart = sh.value.length - 1;
		}
		// Shell history - Arrow DOWN
		else if (e.keyCode == ARRDN && document.getElementById("shell")) {
			shellHistoryCurrent++;
			// If shell history is bigger then max
			if (shellHistoryCurrent > shellHistoryCount) {shellHistoryCurrent = shellHistoryCount;}
			// If shell history is bigger then max, add empty command
			if (!shellHistory[shellHistoryCurrent]) {shellHistory[shellHistoryCurrent] = "";}
			// Output to comandline
			sh.value = decodeEntities (shellHistory[shellHistoryCurrent]);
		}
	}
}
